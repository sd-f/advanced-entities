import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap, StyleInfo } from 'lit-html/directives/style-map.js';
import { HassEntities, HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant } from './types/homeassistant';
import {
  AdvancedEntitiesRowConfig,
  SubEntityConfig,
  SecondaryInfoConfig,
  StateConfig,
  ActionConfig,
  ActionEventData,
  EvaluatedActionConfig,
  NoActionConfig,
  ToggleActionConfig,
  MoreInfoActionConfig,
  NavigateActionConfig,
  UrlActionConfig,
  PerformActionActionConfig,
  AssistActionConfig,
  CustomActionConfig,
  JavascriptActionConfig,
  MultiActionsActionConfig,
  ToastActionConfig,
  CallServiceActionConfig,
  ShowToastParams,
  CustomActionMultiActionsDelay,
  EvaluatedVariables,
  NORMALISED_ACTION,
  HideIfConfig,
  HideIfObject,
} from './types/types';
import { actionHandler } from './action-handler';
import { handleAction } from './handle-action';
import { fireEvent } from './common/fire-event';
import { forwardHaptic } from './forward-haptic';
import { styles } from './styles';
import { computeStateDisplay } from './common/compute_state_display';
import { TemplateContext, getTemplateOrValue, objectEvalTemplate } from './template-engine';
import { resolveConfig } from './template-resolver';
import { getMatchingConfigState } from './state-matcher';
import { buildStyleGeneric } from './style-builder';
import { computeDomain, computeEntity, isUnavailable, secondsToDuration } from './helpers';
import { DOMAINS_TOGGLE } from './common/const';
import { deepEqual } from './deep-equal';
import copy from 'fast-copy';
import { parseDuration } from './common/parse-duration';

const VERSION = '1.0.0';

console.info(
  `%c ADVANCED-ENTITIES %c v${VERSION} `,
  'color: cyan; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'advanced-entities-row',
  name: 'Advanced Entities Row',
  preview: false,
  description: 'An advanced entities row with template support, state conditions, and button-card styling',
});

// Register custom action handler for javascript/multi-actions/toast
if (!(window as any).advancedEntitiesCustomActionsHandler) {
  (window as any).advancedEntitiesCustomActionsHandler = function (ev: CustomEvent) {
    if (ev.detail.advancedEntitiesCustomAction) {
      ev.detail.advancedEntitiesCustomAction?.callback(ev);
    }
  };
  document.body.addEventListener('ll-custom', (window as any).advancedEntitiesCustomActionsHandler);
}

const SECONDARY_INFO_VALUES = ['last-changed', 'last-updated', 'last-triggered', 'position', 'tilt-position', 'brightness'];
const TIMESTAMP_FORMATS = ['relative', 'total', 'date', 'time', 'datetime'];
const LAST_CHANGED = 'last-changed';
const LAST_UPDATED = 'last-updated';

@customElement('advanced-entities-row')
class AdvancedEntitiesRow extends LitElement {
  @property() private _hass?: HomeAssistant;
  @property() private _config?: AdvancedEntitiesRowConfig;

  private _stateObj: HassEntity | undefined;
  private _pStates?: HassEntities;
  private _pHass?: HomeAssistant;
  private _pVariables?: any;
  private _evaluatedVariables: EvaluatedVariables = {};
  private _monitoredEntities: string[] = [];
  private _entityIds: string[] = [];
  private _initialSetupComplete = false;
  private _entities: Array<SubEntityConfig & { stateObj: HassEntity | undefined }> = [];
  private _info: HassEntity | undefined;

  static get styles() {
    return styles;
  }

  public setConfig(config: AdvancedEntitiesRowConfig): void {
    if (!config || !config.entity) {
      throw new Error('Please define a main entity.');
    }

    // Validate sub-entities
    if (config.entities) {
      config.entities.forEach((entity) => {
        if (typeof entity === 'object' && !(entity.entity || entity.attribute || entity.icon)) {
          throw new Error(`Entity object requires at least one 'entity', 'attribute' or 'icon'.`);
        } else if (typeof entity === 'string' && entity === '') {
          throw new Error('Entity ID string must not be blank.');
        }
      });
    }

    // Resolve templates
    const resolved = resolveConfig(config);

    this._entityIds = this._getEntityIds(resolved);
    this._config = {
      ...resolved,
      name: resolved.name === false ? ' ' : resolved.name,
    };

    this._initialSetupComplete = false;
  }

  public set hass(hass: HomeAssistant) {
    this._hass = hass;

    if (!this._pStates) {
      this._pStates = this._createStateProxy();
    }
    this._pHass = {
      ...hass,
      states: this._pStates,
    };

    if (!this._initialSetupComplete) {
      this._finishSetup();
    }

    if (hass && this._config) {
      this._stateObj = hass.states[this._config.entity];

      // Resolve secondary info state object
      if (typeof this._config.secondary_info === 'object') {
        const secInfo = this._config.secondary_info as SecondaryInfoConfig;
        this._info = secInfo.entity ? hass.states[secInfo.entity] : this._stateObj;
      }

      // Resolve sub-entity state objects
      this._entities = (this._config.entities || []).map((config) => {
        const conf: SubEntityConfig = typeof config === 'string' ? { entity: config } : config;
        return { ...conf, stateObj: conf.entity ? hass.states[conf.entity] : this._stateObj };
      });
    }
  }

  private _finishSetup(): void {
    if (!this._hass || !this._config || this._initialSetupComplete) return;

    this._pVariables = this._createVariablesProxy(copy(this._config.variables));

    // Set default tap_action based on entity domain
    if (!this._config.tap_action) {
      if (this._config.entity && DOMAINS_TOGGLE.has(computeDomain(this._config.entity))) {
        this._config = { tap_action: { action: 'toggle' }, ...this._config };
      } else if (this._config.entity) {
        this._config = { tap_action: { action: 'more-info' }, ...this._config };
      } else {
        this._config = { tap_action: { action: 'none' }, ...this._config };
      }
    }

    if (!this._config.hold_action) {
      this._config.hold_action = { action: 'none' };
    }
    if (!this._config.double_tap_action) {
      this._config.double_tap_action = { action: 'none' };
    }

    this._initialSetupComplete = true;
  }

  private _createStateProxy(): HassEntities {
    return new Proxy(
      {},
      {
        get: (__target, prop: string) => {
          if (prop.includes('.') && !this._monitoredEntities.includes(prop)) {
            this._monitoredEntities.push(prop);
          }
          return this._hass?.states?.[prop];
        },
        has: (__target, prop: string) => {
          return !!this._hass?.states?.[prop];
        },
        ownKeys: () => {
          if (!this._hass || !this._hass.states) return [];
          return Object.keys(this._hass.states);
        },
        getOwnPropertyDescriptor: (__target, prop: string) => {
          return {
            value: this._hass?.states?.[prop],
            enumerable: true,
            configurable: true,
          };
        },
      },
    );
  }

  private _createVariablesProxy(variables: any): any {
    if (!variables) return {};
    this._evaluatedVariables = {};
    return new Proxy(variables, {
      get: (__target, prop: string) => {
        if (prop in this._evaluatedVariables && 'value' in this._evaluatedVariables[prop]) {
          return this._evaluatedVariables[prop].value;
        } else if (prop in __target) {
          if (this._evaluatedVariables[prop]?.loop) {
            throw new Error(`advanced-entities: Detected a loop while evaluating variable "${prop}"`);
          }
          this._evaluatedVariables[prop] = { loop: true };
          const origin = Reflect.get(__target, prop);
          const ctx = this._getTemplateContext();
          if (typeof origin === 'object' && origin !== null && 'value' in origin) {
            this._evaluatedVariables[prop].value = objectEvalTemplate(ctx, this._stateObj, origin.value);
          } else {
            this._evaluatedVariables[prop].value = objectEvalTemplate(ctx, this._stateObj, origin);
          }
          delete this._evaluatedVariables[prop].loop;
          return this._evaluatedVariables[prop].value;
        } else {
          return undefined;
        }
      },
    });
  }

  private _getTemplateContext(): TemplateContext {
    return {
      hass: this._hass!,
      pHass: this._pHass!,
      pStates: this._pStates!,
      stateObj: this._stateObj,
      pVariables: this._pVariables,
      evaluatedVariables: this._evaluatedVariables,
    };
  }

  private _getEntityIds(config: AdvancedEntitiesRowConfig): string[] {
    const ids: string[] = [config.entity];
    if (typeof config.secondary_info === 'object' && config.secondary_info?.entity) {
      ids.push(config.secondary_info.entity);
    }
    if (config.entities) {
      config.entities.forEach((entity) => {
        if (typeof entity === 'string') {
          ids.push(entity);
        } else if (entity.entity) {
          ids.push(entity.entity);
        }
      });
    }
    return ids.filter(Boolean);
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('_config')) {
      return true;
    }

    const oldHass = changedProps.get('_hass') as HomeAssistant | undefined;
    if (oldHass) {
      // Check static entity IDs
      if (this._entityIds.some((entity) => oldHass.states[entity] !== this._hass!.states[entity])) {
        return true;
      }
      // Check dynamically monitored entities (from templates)
      if (this._monitoredEntities.some((entity) => oldHass.states[entity] !== this._hass!.states[entity])) {
        return true;
      }
    }
    return false;
  }

  protected render(): TemplateResult {
    if (!this._hass || !this._config) return html``;
    if (!this._stateObj) return this._renderWarning();

    const ctx = this._getTemplateContext();
    const configState = getMatchingConfigState(ctx, this._config.state, this._stateObj);

    // Build styles for various parts of the row
    const rowStyle = buildStyleGeneric(ctx, this._stateObj, this._config.styles, configState, 'row');

    // Build the config to pass to hui-generic-entity-row
    // Override name/icon from configState or templates
    const rowConfig = this._buildRowConfig(ctx, configState);

    return html`<hui-generic-entity-row
      .hass="${this._hass}"
      .config="${rowConfig}"
      .secondaryText="${this._renderSecondaryInfo(ctx)}"
      .catchInteraction=${false}
      style=${styleMap(rowStyle)}
    >
      <div class="${this._config.column ? 'entities-column' : 'entities-row'}">
        ${this._entities.map((entity) => this._renderEntity(ctx, entity.stateObj, entity))}
        ${this._renderMainEntity(ctx, configState)}
      </div>
    </hui-generic-entity-row>`;
  }

  private _buildRowConfig(ctx: TemplateContext, configState: StateConfig | undefined): any {
    const config = { ...this._config };

    // Apply name from state condition or template
    if (configState?.name) {
      config.name = getTemplateOrValue(ctx, this._stateObj, configState.name);
    } else if (config.name && config.name !== ' ') {
      config.name = getTemplateOrValue(ctx, this._stateObj, config.name);
    }

    // Apply icon from state condition or template
    if (configState?.icon) {
      config.icon = getTemplateOrValue(ctx, this._stateObj, configState.icon);
    } else if (config.icon) {
      config.icon = getTemplateOrValue(ctx, this._stateObj, config.icon);
    }

    return config;
  }

  private _renderSecondaryInfo(ctx: TemplateContext): TemplateResult | string | null {
    if (!this._config?.secondary_info) return null;

    // Standard HA secondary info types
    if (typeof this._config.secondary_info === 'string') {
      if (SECONDARY_INFO_VALUES.includes(this._config.secondary_info)) {
        return null; // Let hui-generic-entity-row handle it
      }
      // It's a custom string - evaluate as template
      return html`${getTemplateOrValue(ctx, this._stateObj, this._config.secondary_info)}`;
    }

    const secConfig = this._config.secondary_info as SecondaryInfoConfig;
    if (!this._info || this._hideIf(this._info, secConfig)) return null;

    const name = this._entityName(this._info, secConfig);
    const value = this._entityStateDisplay(this._info, secConfig);

    // Apply secondary_info styles
    const secConfigState = secConfig.state
      ? getMatchingConfigState(ctx, secConfig.state, this._info)
      : undefined;
    const secStyle = buildStyleGeneric(ctx, this._info, secConfig.styles, secConfigState, 'secondary_info');

    return html`<span style=${styleMap(secStyle)}>${name ? `${name} ` : ''}${value}</span>`;
  }

  private _renderMainEntity(ctx: TemplateContext, configState: StateConfig | undefined): TemplateResult | null {
    if (this._config!.show_state === false) return null;

    const stateStyle = buildStyleGeneric(ctx, this._stateObj, this._config!.styles, configState, 'state');

    // State display: configState.state_display > config.state_display > computed state
    let stateDisplay: string | undefined;
    if (configState?.state_display) {
      stateDisplay = getTemplateOrValue(ctx, this._stateObj, configState.state_display);
    } else if (this._config!.state_display) {
      stateDisplay = getTemplateOrValue(ctx, this._stateObj, this._config!.state_display);
    }

    const actionConfig = this._buildMainActionConfig();

    return html`<div
      class="state entity"
      style=${styleMap(stateStyle)}
      .actionHandler=${actionHandler({
        hasHold: this._isActionDoingSomething(this._config!.hold_action),
        hasDoubleClick: this._isActionDoingSomething(this._config!.double_tap_action),
      })}
      @action=${(ev: CustomEvent) => this._handleAction(ev, this._config!)}
    >
      ${this._config!.state_header && html`<span>${this._config!.state_header}</span>`}
      <div>${stateDisplay !== undefined ? stateDisplay : this._renderValue(this._stateObj!, this._config!)}</div>
    </div>`;
  }

  private _renderEntity(
    ctx: TemplateContext,
    stateObj: HassEntity | undefined,
    config: SubEntityConfig,
  ): TemplateResult | null {
    if (!stateObj || this._hideIf(stateObj, config)) {
      if (config.default) {
        return html`<div class="entity">
          <span>${config.name}</span>
          <div>${config.default}</div>
        </div>`;
      }
      return null;
    }

    // Get matching state config for this sub-entity
    const subConfigState = config.state
      ? getMatchingConfigState(ctx, config.state, stateObj)
      : undefined;

    // Build styles for this sub-entity
    const containerStyle = buildStyleGeneric(ctx, stateObj, config.styles, subConfigState, 'container');
    const nameStyle = buildStyleGeneric(ctx, stateObj, config.styles, subConfigState, 'name');
    const valueStyle = buildStyleGeneric(ctx, stateObj, config.styles, subConfigState, 'value');
    const iconStyle = buildStyleGeneric(ctx, stateObj, config.styles, subConfigState, 'icon');

    // Resolve name from state config or template
    let entityNameStr = this._entityName(stateObj, config);
    if (subConfigState?.name) {
      entityNameStr = getTemplateOrValue(ctx, stateObj, subConfigState.name);
    }

    // Resolve icon from state config
    let entityIcon = config.icon;
    if (subConfigState?.icon) {
      entityIcon = getTemplateOrValue(ctx, stateObj, subConfigState.icon);
    }

    // State display override
    let stateDisplay: string | undefined;
    if (subConfigState?.state_display) {
      stateDisplay = getTemplateOrValue(ctx, stateObj, subConfigState.state_display);
    } else if (config.state_display) {
      stateDisplay = getTemplateOrValue(ctx, stateObj, config.state_display);
    }

    const hasActions = this._isActionDoingSomething(config.tap_action) ||
      this._isActionDoingSomething(config.hold_action) ||
      this._isActionDoingSomething(config.double_tap_action);

    return html`<div
      class="entity"
      style=${styleMap(containerStyle)}
      .actionHandler=${actionHandler({
        hasHold: this._isActionDoingSomething(config.hold_action),
        hasDoubleClick: this._isActionDoingSomething(config.double_tap_action),
        disabled: !hasActions && !stateObj.entity_id,
      })}
      @action=${(ev: CustomEvent) => this._handleSubEntityAction(ev, config, stateObj)}
    >
      <span style=${styleMap(nameStyle)}>${entityNameStr}</span>
      <div style=${styleMap(valueStyle)}>
        ${stateDisplay !== undefined
          ? stateDisplay
          : entityIcon
            ? this._renderIcon(stateObj, config, entityIcon, iconStyle)
            : this._renderValue(stateObj, config)}
      </div>
    </div>`;
  }

  private _renderValue(stateObj: HassEntity, config: any): TemplateResult | string {
    if (config.toggle === true) {
      return html`<ha-entity-toggle .stateObj="${stateObj}" .hass="${this._hass}"></ha-entity-toggle>`;
    }
    if (config.attribute && [LAST_CHANGED, LAST_UPDATED].includes(config.attribute)) {
      return html`<ha-relative-time
        .hass=${this._hass}
        .datetime=${stateObj[config.attribute?.replace('-', '_')]}
        capitalize
      ></ha-relative-time>`;
    }
    if (config.format && TIMESTAMP_FORMATS.includes(config.format)) {
      const value = config.attribute
        ? stateObj.attributes[config.attribute] ?? stateObj[config.attribute]
        : stateObj.state;
      const timestamp = new Date(value);
      if (!(timestamp instanceof Date) || isNaN(timestamp.getTime())) {
        return value;
      }
      return html`<hui-timestamp-display
        .hass=${this._hass}
        .ts=${timestamp}
        .format=${config.format}
        capitalize
      ></hui-timestamp-display>`;
    }
    return this._entityStateDisplay(stateObj, config);
  }

  private _renderIcon(
    stateObj: HassEntity,
    config: SubEntityConfig,
    icon: string | boolean | undefined,
    iconStyle: StyleInfo,
  ): TemplateResult {
    const resolvedIcon = icon === true
      ? stateObj.attributes.icon || null
      : icon;
    return html`<state-badge
      class="icon-small"
      .hass=${this._hass}
      .stateObj="${stateObj}"
      .overrideIcon="${resolvedIcon}"
      .stateColor="${config.state_color}"
      style=${styleMap(iconStyle)}
    ></state-badge>`;
  }

  private _renderWarning(): TemplateResult {
    return html`<hui-warning>
      ${this._hass!.localize('ui.panel.lovelace.warning.entity_not_found', 'entity', this._config!.entity)}
    </hui-warning>`;
  }

  // ============================================================================
  // Entity helpers (adapted from multiple-entity-row)
  // ============================================================================

  private _entityName(stateObj: HassEntity | undefined, config: any): string | null {
    if (config.name === false) return null;
    return (
      config.name ||
      (config.entity
        ? stateObj?.attributes?.friendly_name || computeEntity(stateObj?.entity_id || '')
        : null) ||
      null
    );
  }

  private _entityStateDisplay(stateObj: HassEntity, config: any): string {
    if (isUnavailable(stateObj)) {
      return this._hass!.localize(`state.default.${stateObj.state}`);
    }

    let value = config.attribute ? stateObj.attributes[config.attribute] : stateObj.state;
    let unit =
      config.unit === false
        ? undefined
        : config.attribute !== undefined
          ? config.unit
          : config.unit || stateObj.attributes.unit_of_measurement;

    if (config.format) {
      if (isNaN(parseFloat(value)) || !isFinite(value)) {
        // not a number, skip formatting
      } else if (config.format === 'brightness') {
        value = Math.round((value / 255) * 100);
        unit = '%';
      } else if (config.format === 'duration') {
        value = secondsToDuration(value);
        unit = undefined;
      } else if (config.format === 'duration-m') {
        value = secondsToDuration(value / 1000);
        unit = undefined;
      } else if (config.format === 'duration-h') {
        value = secondsToDuration(value * 3600);
        unit = undefined;
      } else if (config.format.startsWith('precision')) {
        const precision = parseInt(config.format.slice(-1), 10);
        value = parseFloat(value).toFixed(precision);
      } else if (config.format === 'kilo') {
        value = (value / 1000).toFixed(2);
      } else if (config.format === 'invert') {
        value = (value - value * 2).toString();
      } else if (config.format === 'position') {
        value = (100 - value).toString();
      }
      return `${value}${unit ? ` ${unit}` : ''}`;
    }

    if (config.attribute) {
      return `${isNaN(value) ? value : value}${unit ? ` ${unit}` : ''}`;
    }

    const modifiedStateObj = { ...stateObj, attributes: { ...stateObj.attributes, unit_of_measurement: unit } };
    return computeStateDisplay(this._hass!.localize, modifiedStateObj, this._hass!.locale, this._hass!.config, this._hass!.entities, undefined);
  }

  // ============================================================================
  // Hide logic (from multiple-entity-row)
  // ============================================================================

  private _hideIf(stateObj: HassEntity | undefined, config: any): boolean {
    if (config.hide_unavailable && isUnavailable(stateObj)) {
      return true;
    }
    if (config.hide_unavailable && config.attribute &&
      ![LAST_CHANGED, LAST_UPDATED].includes(config.attribute) &&
      stateObj?.attributes[config.attribute] === undefined) {
      return true;
    }
    if (config.hide_if === undefined) return false;

    const value = config.attribute ? stateObj?.attributes[config.attribute] : stateObj?.state;
    let hideValues: any[] = [];

    if (typeof config.hide_if === 'object' && !Array.isArray(config.hide_if)) {
      const hideObj = config.hide_if as HideIfObject;
      if (hideObj.below !== undefined && value < hideObj.below) return true;
      if (hideObj.above !== undefined && value > hideObj.above) return true;
      if (hideObj.value) {
        hideValues = hideValues.concat(hideObj.value);
      }
    } else {
      hideValues = hideValues.concat(config.hide_if);
    }
    return hideValues.some((hideValue: any) =>
      typeof hideValue === 'number' ? hideValue === +value : hideValue === value,
    );
  }

  // ============================================================================
  // Action handling (from button-card)
  // ============================================================================

  private _isActionDoingSomething(action: ActionConfig | undefined): boolean {
    if (!action) return false;
    if (typeof action === 'string') return true;
    return action.action !== 'none';
  }

  private _buildMainActionConfig(): ActionEventData {
    const config = this._config!;
    if (!config.tap_action || !this._isActionDoingSomething(config.tap_action)) {
      // Default: more-info for the entity
      return {
        entity: config.entity,
        [NORMALISED_ACTION]: { action: 'more-info' } as MoreInfoActionConfig,
      };
    }
    return this._evalActions(config, config.tap_action!);
  }

  private _handleAction(ev: CustomEvent, config: AdvancedEntitiesRowConfig | SubEntityConfig): void {
    if (!ev.detail?.action) return;
    const action = ev.detail.action;
    const actionKey = `${action}_action` as keyof typeof config;
    const actionConfig = config[actionKey] as ActionConfig | undefined;
    if (actionConfig && this._isActionDoingSomething(actionConfig)) {
      const localAction = this._evalActions(config as any, actionConfig);
      this._executeAction(localAction);
    }
  }

  private _handleSubEntityAction(ev: CustomEvent, config: SubEntityConfig, stateObj: HassEntity): void {
    if (!ev.detail?.action) return;
    const action = ev.detail.action;
    const actionKey = `${action}_action` as keyof SubEntityConfig;
    const actionConfig = config[actionKey] as ActionConfig | undefined;

    if (actionConfig && this._isActionDoingSomething(actionConfig)) {
      const localAction = this._evalActions(config as any, actionConfig);
      this._executeAction(localAction);
    } else if (action === 'tap' && stateObj.entity_id) {
      // Default: more-info
      fireEvent(this, 'hass-action', {
        config: { entity: stateObj.entity_id, tap_action: { action: 'more-info' } },
        action: 'tap',
      });
    }
  }

  private _evalActions(config: any, action: ActionConfig): ActionEventData {
    const ctx = this._getTemplateContext();
    let evaledActionConfig: EvaluatedActionConfig | undefined;
    if (typeof action === 'string') {
      evaledActionConfig = objectEvalTemplate(ctx, this._stateObj, action);
    } else {
      evaledActionConfig = copy(action);
    }

    const actionType = getTemplateOrValue(ctx, this._stateObj, evaledActionConfig?.action);

    if (actionType === 'none' || !actionType) {
      const noAction: ActionEventData = {};
      noAction[NORMALISED_ACTION] = { action: 'none' } as NoActionConfig;
      return noAction;
    }

    const repeat = getTemplateOrValue(ctx, this._stateObj, evaledActionConfig?.repeat);
    const repeat_limit = getTemplateOrValue(ctx, this._stateObj, evaledActionConfig?.repeat_limit);
    const sound = getTemplateOrValue(ctx, this._stateObj, evaledActionConfig?.sound);
    let confirmation = getTemplateOrValue(ctx, this._stateObj, evaledActionConfig?.confirmation);
    if (!confirmation && config.confirmation) {
      confirmation = objectEvalTemplate(ctx, this._stateObj, config.confirmation);
    }
    const haptic = getTemplateOrValue(ctx, this._stateObj, evaledActionConfig?.haptic);

    const actionData: ActionEventData = {};
    switch (actionType) {
      case 'javascript':
        actionData[NORMALISED_ACTION] = {
          action: 'fire-dom-event',
          advancedEntitiesCustomAction: {
            callback: this._customActionsCallback.bind(this),
            type: 'javascript',
            data: {
              javascript: (evaledActionConfig as JavascriptActionConfig)?.javascript,
            },
          },
        } as CustomActionConfig;
        break;

      case 'multi-actions':
        actionData[NORMALISED_ACTION] = {
          action: 'fire-dom-event',
          advancedEntitiesCustomAction: {
            callback: this._customActionsCallback.bind(this),
            type: 'multi-actions',
            data: {
              multiActions: (evaledActionConfig as MultiActionsActionConfig)?.actions,
            },
          },
        } as CustomActionConfig;
        break;

      case 'toast':
        actionData[NORMALISED_ACTION] = {
          action: 'fire-dom-event',
          advancedEntitiesCustomAction: {
            callback: this._customActionsCallback.bind(this),
            type: 'toast',
            data: {
              toast: (evaledActionConfig as ToastActionConfig)?.toast,
            },
          },
        } as CustomActionConfig;
        break;

      case 'toggle':
        actionData.entity =
          getTemplateOrValue(ctx, this._stateObj, (evaledActionConfig as ToggleActionConfig)?.entity) ||
          getTemplateOrValue(ctx, this._stateObj, config.entity);
        actionData[NORMALISED_ACTION] = { action: 'toggle' } as ToggleActionConfig;
        break;

      case 'more-info':
        actionData.entity =
          getTemplateOrValue(ctx, this._stateObj, (evaledActionConfig as MoreInfoActionConfig)?.entity) ||
          getTemplateOrValue(ctx, this._stateObj, config.entity);
        actionData[NORMALISED_ACTION] = { action: 'more-info' } as MoreInfoActionConfig;
        break;

      case 'navigate':
        actionData[NORMALISED_ACTION] = {
          action: 'navigate',
          navigation_path: getTemplateOrValue(ctx, this._stateObj, (evaledActionConfig as NavigateActionConfig)?.navigation_path),
          navigation_replace: getTemplateOrValue(ctx, this._stateObj, (evaledActionConfig as NavigateActionConfig)?.navigation_replace),
        } as NavigateActionConfig;
        break;

      case 'url':
        actionData[NORMALISED_ACTION] = {
          action: 'url',
          url_path: getTemplateOrValue(ctx, this._stateObj, (evaledActionConfig as UrlActionConfig)?.url_path),
        } as UrlActionConfig;
        break;

      case 'perform-action':
      case 'call-service':
        actionData[NORMALISED_ACTION] = {
          action: 'perform-action',
          perform_action:
            getTemplateOrValue(ctx, this._stateObj, (evaledActionConfig as PerformActionActionConfig)?.perform_action) ||
            getTemplateOrValue(ctx, this._stateObj, (evaledActionConfig as unknown as CallServiceActionConfig)?.service),
          data:
            objectEvalTemplate(ctx, this._stateObj, (evaledActionConfig as PerformActionActionConfig)?.data) ||
            objectEvalTemplate(ctx, this._stateObj, (evaledActionConfig as PerformActionActionConfig)?.service_data),
          target: objectEvalTemplate(ctx, this._stateObj, (evaledActionConfig as PerformActionActionConfig)?.target),
        } as PerformActionActionConfig;
        if ((actionData[NORMALISED_ACTION] as any)?.data?.entity_id === 'entity') {
          (actionData[NORMALISED_ACTION] as any).data.entity_id = getTemplateOrValue(ctx, this._stateObj, config.entity);
        }
        break;

      case 'assist':
        actionData[NORMALISED_ACTION] = {
          action: 'assist',
          pipeline_id: getTemplateOrValue(ctx, this._stateObj, (evaledActionConfig as AssistActionConfig)?.pipeline_id),
          start_listening: getTemplateOrValue(ctx, this._stateObj, (evaledActionConfig as AssistActionConfig)?.start_listening),
        } as AssistActionConfig;
        break;

      case 'fire-dom-event':
        actionData[NORMALISED_ACTION] = {
          action: 'fire-dom-event',
          ...objectEvalTemplate(ctx, this._stateObj, evaledActionConfig),
        } as CustomActionConfig;
        break;

      default:
        return { [NORMALISED_ACTION]: { action: 'none' } as NoActionConfig };
    }

    actionData[NORMALISED_ACTION] = {
      ...actionData[NORMALISED_ACTION],
      repeat,
      repeat_limit,
      sound,
      haptic,
      confirmation,
    };

    return actionData;
  }

  private _executeAction(actionData: ActionEventData): void {
    const action = actionData[NORMALISED_ACTION];
    if (!action || action.action === 'none') return;

    // Play sound if specified
    if (action.sound) {
      const sound = new Audio(action.sound);
      sound.play().catch(() => {});
    }

    // Haptic feedback
    if (action.haptic && action.haptic !== 'none') {
      forwardHaptic(this, action.haptic);
    }

    // Confirmation dialog
    if (action.confirmation) {
      const text = typeof action.confirmation === 'string'
        ? action.confirmation
        : (action.confirmation as any)?.text || 'Are you sure?';
      if (!confirm(text)) return;
    }

    // Fire the action via hass-action
    handleAction(this, this._hass!, actionData, 'tap');
  }

  private _customActionsCallback(ev: any): void {
    const customAction = ev.detail.advancedEntitiesCustomAction;
    if (!customAction) return;
    const ctx = this._getTemplateContext();

    if (customAction.type === 'javascript') {
      const javascript = getTemplateOrValue(ctx, this._stateObj, customAction.data?.javascript);
      if (javascript) {
        // eslint-disable-next-line no-new-func
        new Function(
          'states', 'entity', 'user', 'hass', 'variables', 'html',
          `'use strict'; ${javascript}`,
        ).call(
          null,
          this._pStates,
          this._stateObj,
          this._hass!.user,
          this._pHass,
          this._pVariables,
          html,
        );
      }
    } else if (customAction.type === 'multi-actions') {
      let multiActions = customAction.data?.multiActions;
      if (multiActions) {
        multiActions = objectEvalTemplate(ctx, this._stateObj, multiActions) as ActionConfig[];
        this._executeMultiActions(multiActions);
      }
    } else if (customAction.type === 'toast') {
      let toast = customAction.data?.toast;
      if (toast) {
        toast = objectEvalTemplate(ctx, this._stateObj, toast) as ShowToastParams;
        this._sendToastMessage(toast);
      }
    }
  }

  private async _executeMultiActions(actions: any[]): Promise<void> {
    const ctx = this._getTemplateContext();
    for (const actionConfig of actions) {
      if ((actionConfig as CustomActionMultiActionsDelay).delay !== undefined) {
        const delayConfig = actionConfig as CustomActionMultiActionsDelay;
        let delay = getTemplateOrValue(ctx, this._stateObj, delayConfig.delay);
        if (typeof delay === 'string') {
          delay = parseDuration(delay, 'ms', 'en') || 0;
        }
        const timeout = getTemplateOrValue(ctx, this._stateObj, delayConfig.timeout);
        if (!getTemplateOrValue(ctx, this._stateObj, delayConfig.wait_completion)) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          await new Promise((resolve) =>
            setTimeout(resolve, timeout ? (typeof timeout === 'string' ? parseDuration(timeout, 'ms', 'en') || delay : timeout) : delay),
          );
        }
      } else {
        const actionData = this._evalActions(this._config!, actionConfig as ActionConfig);
        this._executeAction(actionData);
      }
    }
  }

  private _sendToastMessage(params: ShowToastParams): void {
    fireEvent(this, 'hass-notification' as any, {
      message: params.message || '',
      duration: params.duration || 3000,
      dismissable: params.dismissable !== false,
    });
  }
}

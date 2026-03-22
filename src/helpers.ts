import { TinyColor } from '@ctrl/tinycolor';
import { HomeAssistant } from './types/homeassistant';
import { LovelaceConfig } from './types/lovelace';
import { StateConfig } from './types/types';
import { HassEntity, HassEntityAttributeBase, HassEntityBase } from 'home-assistant-js-websocket';
import { OFF, UNAVAILABLE, isUnavailableState } from './common/const';

export function computeDomain(entityId: string): string {
  return entityId.substr(0, entityId.indexOf('.'));
}

export function computeEntity(entityId: string): string {
  return entityId.substr(entityId.indexOf('.') + 1);
}

export const computeStateDomain = (stateObj: HassEntity) => computeDomain(stateObj.entity_id);

export function getColorFromVariable(elt: Element, color: string): string {
  const colorArray: string[] = [];
  let result = color;
  if (color.trim().substring(0, 3) === 'var') {
    color.split(',').forEach((singleColor) => {
      const matches = singleColor.match(/var\(\s*([a-zA-Z0-9-]*)/);
      if (matches) {
        colorArray.push(matches[1]);
      }
    });

    colorArray.some((color) => {
      const card = window.getComputedStyle(elt).getPropertyValue(color);
      if (card) {
        result = card;
        return true;
      }
      return false;
    });
  }
  return result;
}

export function getFontColorBasedOnBackgroundColor(elt: Element, backgroundColor: string): string {
  const bgLuminance = new TinyColor(getColorFromVariable(elt, backgroundColor)).getLuminance();
  const light = new TinyColor({ r: 225, g: 225, b: 225 });
  const lightLuminance = light.getLuminance();
  const dark = new TinyColor({ r: 28, g: 28, b: 28 });
  const darkLuminance = dark.getLuminance();

  if (bgLuminance === 0) {
    return light.toRgbString();
  }

  const whiteContrast = (Math.max(bgLuminance, lightLuminance) + 0.05) / Math.min(bgLuminance, lightLuminance + 0.05);
  const blackContrast = (Math.max(bgLuminance, darkLuminance) + 0.05) / Math.min(bgLuminance, darkLuminance + 0.05);
  return whiteContrast > blackContrast ? light.toRgbString() : dark.toRgbString();
}

export function applyBrightnessToColor(elt: Element, color: string, brightness: number): string {
  const colorObj = new TinyColor(getColorFromVariable(elt, color));
  if (colorObj.isValid) {
    const validColor = colorObj.mix('black', 100 - brightness).toString();
    if (validColor) return validColor;
  }
  return color;
}

export function mergeDeep(...objects: any): any {
  const isObject = (obj: any) => obj && typeof obj === 'object';

  return objects.reduce((prev: any, obj: any) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

export function mergeStatesById(
  intoStates: StateConfig[] | undefined,
  fromStates: StateConfig[] | undefined,
): StateConfig[] {
  let resultStateConfigs: StateConfig[] = [];
  if (intoStates) {
    intoStates.forEach((intoState) => {
      let localState = intoState;
      if (fromStates) {
        fromStates.forEach((fromState) => {
          if (fromState.id && intoState.id && fromState.id == intoState.id)
            localState = mergeDeep(localState, fromState);
        });
      }
      resultStateConfigs.push(localState);
    });
  }
  if (fromStates) {
    resultStateConfigs = resultStateConfigs.concat(
      fromStates.filter((x) => (!intoStates ? true : !intoStates.find((y) => (y.id && x.id ? y.id == x.id : false)))),
    );
  }
  return resultStateConfigs;
}

export function getLovelaceCast(): any {
  let root: any = document.querySelector('hc-main');
  root = root && root.shadowRoot;
  root = root && root.querySelector('hc-lovelace');
  root = root && root.shadowRoot;
  root = root && (root.querySelector('hui-view') || root.querySelector('hui-panel-view'));
  if (root) {
    const ll = root.lovelace;
    ll.current_view = root?._curView ?? 0;
    return ll;
  }
  return null;
}

export function getLovelace(): LovelaceConfig | null {
  let root: any = document.querySelector('home-assistant');
  root = root && root.shadowRoot;
  root = root && root.querySelector('home-assistant-main');
  root = root && root.shadowRoot;
  root = root && root.querySelector('app-drawer-layout partial-panel-resolver, ha-drawer partial-panel-resolver');
  root = (root && root.shadowRoot) || root;
  root = root && root.querySelector('ha-panel-lovelace');
  root = root && root.shadowRoot;
  root = root && root.querySelector('hui-root');
  if (root) {
    const ll = root.lovelace;
    ll.current_view = root?._curView ?? 0;
    return ll;
  }
  return null;
}

export function stateActive(stateObj: HassEntity | undefined, state?: string): boolean {
  if (stateObj === undefined) {
    return false;
  }
  const domain = computeDomain(stateObj.entity_id);
  const compareState = state !== undefined ? state : stateObj?.state;

  if (['button', 'event', 'input_button', 'scene'].includes(domain)) {
    return compareState !== UNAVAILABLE;
  }

  if (isUnavailableState(compareState)) {
    return false;
  }

  if (compareState === OFF && domain !== 'alert') {
    return false;
  }

  switch (domain) {
    case 'alarm_control_panel':
      return compareState !== 'disarmed';
    case 'alert':
      return compareState !== 'idle';
    case 'cover':
      return compareState !== 'closed';
    case 'device_tracker':
    case 'person':
      return compareState !== 'not_home';
    case 'lock':
      return compareState !== 'locked';
    case 'media_player':
      return compareState !== 'standby';
    case 'vacuum':
      return !['idle', 'docked', 'paused'].includes(compareState);
    case 'plant':
      return compareState === 'problem';
    case 'group':
      return ['on', 'home', 'open', 'locked', 'problem'].includes(compareState);
    case 'timer':
      return compareState === 'active';
    case 'camera':
      return compareState === 'streaming';
  }

  return true;
}

export function durationToSeconds(duration: string): number {
  const parts = duration.split(':').map(Number);
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

const leftPad = (num: number) => (num < 10 ? `0${num}` : num);

export function secondsToDuration(d: number): string | null {
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  if (h > 0) {
    return `${h}:${leftPad(m)}:${leftPad(s)}`;
  }
  if (m > 0) {
    return `${m}:${leftPad(s)}`;
  }
  if (s > 0) {
    return '' + s;
  }
  return null;
}

export function isNumericFromAttributes(attributes: HassEntityAttributeBase): boolean {
  return !!attributes.unit_of_measurement || !!attributes.state_class;
}

export function computeCssVariable(props: string | string[]): string | undefined {
  if (Array.isArray(props)) {
    return props
      .reverse()
      .reduce<string | undefined>((str, variable) => `var(${variable}${str ? `, ${str}` : ''})`, undefined);
  }
  return `var(${props})`;
}

export function computeCssValue(prop: string | string[], computedStyles: CSSStyleDeclaration): string | undefined {
  if (Array.isArray(prop)) {
    for (const property of prop) {
      const value = computeCssValue(property, computedStyles);
      if (value) return value;
    }
    return undefined;
  }

  if (!prop.endsWith('-color')) {
    return undefined;
  }
  return computedStyles.getPropertyValue(prop).trim() || undefined;
}

export const UNAVAILABLE_STATES = ['unavailable', 'unknown'];

export const isUnavailable = (stateObj: HassEntity | undefined): boolean =>
  !stateObj || UNAVAILABLE_STATES.includes(stateObj.state);

export function slugify(value: string, delimiter = '_'): string {
  const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
  const b = `aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz${delimiter}${delimiter}${delimiter}${delimiter}${delimiter}${delimiter}`;
  const p = new RegExp(a.split('').join('|'), 'g');

  return value
    .toString()
    .toLowerCase()
    .replace(/\s+/g, delimiter)
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, `${delimiter}and${delimiter}`)
    .replace(/[^\w-]+/g, '')
    .replace(/-/g, delimiter)
    .replace(new RegExp(`(${delimiter})\\1+`, 'g'), '$1')
    .replace(new RegExp(`^${delimiter}+`), '')
    .replace(new RegExp(`${delimiter}+$`), '');
}

interface GroupEntityAttributes extends HassEntityAttributeBase {
  entity_id: string[];
  order: number;
  auto?: boolean;
  view?: boolean;
  control?: 'hidden';
}

export interface GroupEntity extends HassEntityBase {
  attributes: GroupEntityAttributes;
}

export const computeGroupDomain = (stateObj: GroupEntity): string | undefined => {
  const entityIds = stateObj.attributes.entity_id || [];
  const uniqueDomains = [...new Set(entityIds.map((entityId) => computeDomain(entityId)))];
  return uniqueDomains.length === 1 ? uniqueDomains[0] : undefined;
};

export const batteryStateColorProperty = (state: string): string | undefined => {
  const value = Number(state);
  if (isNaN(value)) {
    return undefined;
  }
  if (value >= 70) {
    return '--state-sensor-battery-high-color';
  }
  if (value >= 30) {
    return '--state-sensor-battery-medium-color';
  }
  return '--state-sensor-battery-low-color';
};

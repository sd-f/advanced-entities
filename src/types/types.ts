import { HapticType } from '../forward-haptic';
import { HassServiceTarget } from 'home-assistant-js-websocket';

// ============================================================================
// Button-card types (reused for template/state/action system)
// ============================================================================

export interface StateConfig {
  id?: string;
  operator?: '<' | '<=' | '==' | '>=' | '>' | '!=' | 'regex' | 'template' | 'default';
  value?: any;
  name?: string;
  icon?: string;
  color?: 'auto' | 'auto-no-temperature' | string;
  styles?: StylesConfig;
  state_display?: string;
  spin?: boolean;
}

export interface StylesConfig {
  row?: CssStyleConfig[];
  name?: CssStyleConfig[];
  state?: CssStyleConfig[];
  icon?: CssStyleConfig[];
  secondary_info?: CssStyleConfig[];
  entities?: CssStyleConfig[];
  // Sub-entity style targets
  container?: CssStyleConfig[];
  value?: CssStyleConfig[];
}

export interface CssStyleConfig {
  [key: string]: any;
}

export interface Variables {
  [key: string]: any | VariablesExtended;
}

export interface VariablesExtended {
  value: any;
  force_eval?: boolean;
}

export interface EvaluatedVariables {
  [key: string]: { value?: any; loop?: boolean };
}

// ============================================================================
// Action types (from button-card)
// ============================================================================

export interface ToggleActionConfig extends BaseActionConfig {
  action: 'toggle';
  entity?: string;
}

export interface CallServiceActionConfig extends BaseActionConfig {
  action: 'call-service';
  service: string;
  target?: HassServiceTarget;
  service_data?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

export interface PerformActionActionConfig extends BaseActionConfig {
  action: 'perform-action';
  perform_action: string;
  target?: HassServiceTarget;
  service_data?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

export interface NavigateActionConfig extends BaseActionConfig {
  action: 'navigate';
  navigation_path: string;
  navigation_replace?: boolean;
}

export interface UrlActionConfig extends BaseActionConfig {
  action: 'url';
  url_path: string;
}

export interface MoreInfoActionConfig extends BaseActionConfig {
  action: 'more-info';
  entity?: string;
}

export interface NoActionConfig extends BaseActionConfig {
  action: 'none';
}

export interface CustomActionConfig extends BaseActionConfig {
  action: 'fire-dom-event';
  [key: string]: any;
}

export interface AssistActionConfig extends BaseActionConfig {
  action: 'assist';
  pipeline_id?: string;
  start_listening?: boolean;
}

export interface JavascriptActionConfig extends BaseActionConfig {
  action: 'javascript';
  javascript?: string;
}

export interface MultiActionsActionConfig extends BaseActionConfig {
  action: 'multi-actions';
  actions?: string;
}

export interface ToastActionConfig extends BaseActionConfig {
  action: 'toast';
  toast?: ShowToastParams;
}

export interface BaseActionConfig {
  action: string;
  confirmation?: ConfirmationRestrictionConfig | string;
  repeat?: number;
  repeat_limit?: number;
  sound?: string;
  haptic?: HapticType;
}

export interface ConfirmationRestrictionConfig {
  text?: string;
  exemptions?: RestrictionConfig[];
}

export interface RestrictionConfig {
  user: string;
}

export type ActionConfig =
  | ToggleActionConfig
  | CallServiceActionConfig
  | PerformActionActionConfig
  | NavigateActionConfig
  | UrlActionConfig
  | MoreInfoActionConfig
  | AssistActionConfig
  | NoActionConfig
  | CustomActionConfig
  | JavascriptActionConfig
  | MultiActionsActionConfig
  | ToastActionConfig
  | string;

export type EvaluatedActionConfig = Exclude<ActionConfig, string>;

export interface ActionEventData {
  tap_action?: EvaluatedActionConfig;
  entity?: string;
}

export interface ActionCustomEvent extends CustomEvent {
  detail: {
    advancedEntitiesCustomAction: CustomButtonCardActionEvent;
  };
}

export interface CustomActionBase {
  callback: (ev: ActionCustomEvent) => void;
  this?: any;
}

export interface CustomActionJavascript extends CustomActionBase {
  type: 'javascript';
  data?: {
    javascript?: string;
  };
}

export interface CustomActionMultiActions extends CustomActionBase {
  type: 'multi-actions';
  data?: {
    multiActions?: Array<ActionConfig | CustomActionMultiActionsDelay>;
  };
}

export interface CustomActionToast extends CustomActionBase {
  type: 'toast';
  data?: {
    toast?: ShowToastParams;
  };
}

export interface CustomActionMultiActionsDelay {
  delay?: string | number;
  wait_completion?: boolean;
  timeout?: number | string;
}

export type CustomButtonCardActionEvent = CustomActionJavascript | CustomActionMultiActions | CustomActionToast;

export interface ToastActionParams {
  action: () => void;
  text: string;
}

export interface ShowToastParams {
  message?: string;
  action?: ToastActionParams;
  duration?: number;
  dismissable?: boolean;
}

// ============================================================================
// Advanced Entities Row config types
// ============================================================================

export interface SecondaryInfoConfig {
  entity?: string;
  attribute?: string;
  name?: string | false;
  unit?: string | false;
  format?: string;
  hide_unavailable?: boolean;
  hide_if?: HideIfConfig;
  template?: string | string[];
  variables?: Variables;
  state?: StateConfig[];
  styles?: StylesConfig;
}

export type HideIfValue = string | number;

export interface HideIfObject {
  below?: number;
  above?: number;
  value?: HideIfValue | HideIfValue[];
}

export type HideIfConfig = HideIfValue | HideIfValue[] | HideIfObject;

export interface SubEntityConfig {
  entity?: string;
  attribute?: string;
  name?: string | false;
  icon?: string | boolean;
  unit?: string | false;
  format?: string;
  toggle?: boolean;
  hide_unavailable?: boolean;
  hide_if?: HideIfConfig;
  default?: string;
  state_color?: boolean;

  // button-card features per sub-entity
  template?: string | string[];
  variables?: Variables;
  state?: StateConfig[];
  styles?: StylesConfig;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  state_display?: string;
}

export interface AdvancedEntitiesRowConfig {
  type: string;
  entity: string;
  name?: string | false;
  icon?: string;
  image?: string;
  show_state?: boolean;
  state_header?: string;
  state_color?: boolean;
  column?: boolean;

  // button-card features for the main row
  template?: string | string[];
  variables?: Variables;
  state?: StateConfig[];
  styles?: StylesConfig;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  state_display?: string;

  // Sub-entities
  entities?: (string | SubEntityConfig)[];

  // Secondary info
  secondary_info?: string | SecondaryInfoConfig;
}

export type ColorType = 'icon' | 'card' | 'label-card' | 'blank-card';

export type Constructor<T = any> = new (...args: any[]) => T;

export const NORMALISED_ACTION = 'tap_action';

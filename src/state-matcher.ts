import { HassEntity } from 'home-assistant-js-websocket';
import { StateConfig } from './types/types';
import { TemplateContext, getTemplateOrValue } from './template-engine';

export function getMatchingConfigState(
  ctx: TemplateContext,
  stateConfigs: StateConfig[] | undefined,
  state: HassEntity | undefined,
): StateConfig | undefined {
  if (!stateConfigs) {
    return undefined;
  }
  const hasTemplate = stateConfigs.find((elt) => elt.operator === 'template');
  if (!state && !hasTemplate) {
    return undefined;
  }
  let def: StateConfig | undefined;
  const retval = stateConfigs.find((elt) => {
    if (elt.operator) {
      switch (elt.operator) {
        case '==':
          return state && state.state == getTemplateOrValue(ctx, state, elt.value);
        case '<=':
          return state && state.state <= getTemplateOrValue(ctx, state, elt.value);
        case '<':
          return state && state.state < getTemplateOrValue(ctx, state, elt.value);
        case '>=':
          return state && state.state >= getTemplateOrValue(ctx, state, elt.value);
        case '>':
          return state && state.state > getTemplateOrValue(ctx, state, elt.value);
        case '!=':
          return state && state.state != getTemplateOrValue(ctx, state, elt.value);
        case 'regex': {
          const matches = state && state.state.match(getTemplateOrValue(ctx, state, elt.value)) ? true : false;
          return matches;
        }
        case 'template': {
          return getTemplateOrValue(ctx, state, elt.value);
        }
        case 'default':
          def = elt;
          return false;
        default:
          return false;
      }
    } else {
      return state && getTemplateOrValue(ctx, state, elt.value) == state.state;
    }
  });
  if (!retval && def) {
    return def;
  }
  return retval;
}

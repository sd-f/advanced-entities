import copy from 'fast-copy';
import { mergeDeep, mergeStatesById, getLovelace, getLovelaceCast } from './helpers';
import { AdvancedEntitiesRowConfig, StateConfig, SubEntityConfig } from './types/types';

export function configFromTemplates(ll: any, config: any): any {
  const tpl = config.template;
  let result: any = {};
  if (!tpl) {
    result = copy(config);
  } else {
    let mergedStateConfig: StateConfig[] | undefined;
    const tpls = tpl && Array.isArray(tpl) ? tpl : [tpl];
    tpls?.forEach((template: string) => {
      // Support both advanced_entities_templates and button_card_templates
      const templates =
        ll?.config?.advanced_entities_templates ||
        ll?.config?.button_card_templates;
      if (!templates?.[template])
        throw new Error(`advanced-entities: template '${template}' is missing!`);
      const res = configFromTemplates(ll, templates[template]);
      result = mergeDeep(result, res);
      mergedStateConfig = mergeStatesById(mergedStateConfig, res.state);
    });
    result = mergeDeep(result, config);
    result.state = mergeStatesById(mergedStateConfig, config.state);
  }
  return result;
}

export function resolveConfig(config: AdvancedEntitiesRowConfig): AdvancedEntitiesRowConfig {
  const ll = getLovelace() || getLovelaceCast();
  let resolved: AdvancedEntitiesRowConfig = copy(config);

  // Resolve templates for the main row config
  resolved = configFromTemplates(ll, resolved) as AdvancedEntitiesRowConfig;

  // Resolve templates for each sub-entity
  if (resolved.entities) {
    resolved.entities = resolved.entities.map((entity) => {
      if (typeof entity === 'string') return entity;
      if (entity.template) {
        return configFromTemplates(ll, entity) as SubEntityConfig;
      }
      return entity;
    });
  }

  // Resolve templates for secondary_info if it's an object with a template
  if (typeof resolved.secondary_info === 'object' && resolved.secondary_info?.template) {
    resolved.secondary_info = configFromTemplates(ll, resolved.secondary_info);
  }

  return resolved;
}

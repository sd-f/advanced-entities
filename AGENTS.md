# AGENTS.md

## Project

Custom Home Assistant Lovelace row element (`custom:advanced-entities-row`) combining [lovelace-multiple-entity-row](https://github.com/benct/lovelace-multiple-entity-row) layout with [button-card](https://github.com/custom-cards/button-card) template/styling/action features.

## Build

```
npm install
npm run build     # rollup → dist/advanced-entities-row.js
npm run watch     # dev mode with serve on :5000
```

TypeScript, Rollup, Lit 3. Output is a single ES module JS file.

## Architecture

- `src/advanced-entities-row.ts` — Main LitElement component (entry point, registered as `advanced-entities-row`)
- `src/template-engine.ts` — JS template evaluation (`[[[...]]]` syntax)
- `src/template-resolver.ts` — Config template inheritance from Lovelace config (`advanced_entities_templates` / `button_card_templates`)
- `src/state-matcher.ts` — State condition matching (operators: `==`, `<`, `>`, `!=`, `regex`, `template`, `default`)
- `src/style-builder.ts` — Merges base + state-override styles, evaluates templates in CSS values
- `src/action-handler.ts` — Touch/click handler directive (element: `advanced-entities-action-handler`)
- `src/helpers.ts` — Utility functions (mergeDeep, mergeStatesById, domain helpers, state active checks)
- `src/common/` — Shared utilities copied from button-card (fire-event, compute_state_display, formatters, etc.)
- `src/types/` — TypeScript interfaces for HA, Lovelace, and component config

## Key Design Decisions

- Renders inside `hui-generic-entity-row` for native HA row integration
- State proxy (`Proxy`) on `hass.states` auto-tracks entities accessed in templates
- Variable proxy with loop detection for lazy evaluation
- Action handler element named `advanced-entities-action-handler` to avoid conflicts with button-card
- Supports both `advanced_entities_templates` and `button_card_templates` for template definitions
- Sub-entities each get their own template context (own `stateObj`, inherited variables)

## Reference Code

The `archive/` directory (git-ignored) contains the original source of both upstream projects for reference.

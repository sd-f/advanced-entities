# Advanced Entities Row

A custom Lovelace row element for [Home Assistant](https://www.home-assistant.io/) that combines the multi-entity row layout of [lovelace-multiple-entity-row](https://github.com/benct/lovelace-multiple-entity-row) with the powerful template system, state conditions, styling, and actions from [button-card](https://github.com/custom-cards/button-card).

Use it inside an `entities` card to display multiple entity states in a single row, with full template support for dynamic names, icons, styles, and actions.

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to **Frontend** > **Custom repositories**
3. Add this repository URL and select **Lovelace** as the category
4. Install **Advanced Entities Row**
5. Refresh your browser

### Manual

1. Download `advanced-entities-row.js` from the [latest release](../../releases/latest)
2. Copy it to `config/www/advanced-entities-row.js`
3. Add the resource in **Settings > Dashboards > Resources**:
   ```yaml
   url: /local/advanced-entities-row.js
   type: module
   ```

## Basic Usage

Use `custom:advanced-entities-row` as the `type` inside an `entities` card:

```yaml
type: entities
entities:
  - type: custom:advanced-entities-row
    entity: sensor.living_room_temperature
    entities:
      - sensor.living_room_humidity
      - sensor.living_room_pressure
```

This works identically to `multiple-entity-row` — a main entity on the right with sub-entities alongside it.

## Configuration

### Main Row Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **required** | `custom:advanced-entities-row` |
| `entity` | string | **required** | Main entity ID |
| `name` | string/false | friendly name | Row name. `false` to hide |
| `icon` | string | entity icon | Override icon (supports templates) |
| `image` | string | | Entity image |
| `show_state` | boolean | `true` | Show main entity state |
| `state_header` | string | | Header text above main state |
| `state_color` | boolean | `false` | Color icon based on state |
| `column` | boolean | `false` | Display entities in column layout |
| `secondary_info` | string/object | | Secondary info below entity name |
| `entities` | list | | Sub-entities to display |
| `template` | string/list | | Template name(s) to apply |
| `variables` | object | | Variables for templates |
| `state` | list | | State conditions (see below) |
| `styles` | object | | Custom styles (see below) |
| `state_display` | string | | Override state display (supports templates) |
| `tap_action` | object | `more-info` | Action on tap |
| `hold_action` | object | `none` | Action on hold |
| `double_tap_action` | object | `none` | Action on double tap |

### Sub-Entity Options

Each entry in `entities` can be a string (entity ID) or an object:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | main entity | Entity ID |
| `attribute` | string | | Display an attribute instead of state |
| `name` | string/false | friendly name | Entity name. `false` to hide |
| `icon` | string/boolean | | Icon to display. `true` for entity icon |
| `unit` | string/false | entity unit | Unit. `false` to hide |
| `format` | string | | Value format (see formats below) |
| `toggle` | boolean | `false` | Show toggle instead of state |
| `hide_unavailable` | boolean | `false` | Hide when unavailable |
| `hide_if` | various | | Conditional hiding (see below) |
| `default` | string | | Default value when hidden |
| `state_color` | boolean | `false` | Color icon based on state |
| `template` | string/list | | Template name(s) |
| `variables` | object | | Variables for templates |
| `state` | list | | State conditions |
| `styles` | object | | Custom styles |
| `state_display` | string | | Override state display (supports templates) |
| `tap_action` | object | `more-info` | Action on tap |
| `hold_action` | object | `none` | Action on hold |
| `double_tap_action` | object | `none` | Action on double tap |

### Value Formats

| Format | Description |
|--------|-------------|
| `brightness` | Convert 0-255 to 0-100% |
| `duration` | Seconds to `h:mm:ss` |
| `duration-m` | Milliseconds to `h:mm:ss` |
| `duration-h` | Hours to `h:mm:ss` |
| `precision0`-`precision9` | Decimal precision |
| `kilo` | Divide by 1000 |
| `invert` | Negate value |
| `position` | 100 minus value |
| `relative` | Relative time |
| `total` | Total time |
| `date` | Date display |
| `time` | Time display |
| `datetime` | Date and time |

### Hide If

Hide a sub-entity conditionally:

```yaml
# Hide when state equals a value
hide_if: "off"

# Hide when state matches any value in a list
hide_if:
  - "off"
  - "unavailable"

# Hide based on numeric thresholds
hide_if:
  above: 100
  below: 0

# Combine threshold with specific values
hide_if:
  above: 50
  value:
    - "off"
    - "unavailable"
```

## Templates

Templates work like [button-card templates](https://github.com/custom-cards/button-card#configuration-templates). Define reusable configurations in your Lovelace dashboard config.

### Defining Templates

Add templates to your dashboard's raw config under `advanced_entities_templates` (or `button_card_templates` for cross-compatibility):

```yaml
advanced_entities_templates:
  sensor_row:
    styles:
      state:
        - color: var(--primary-color)
    state:
      - operator: "<"
        value: 10
        styles:
          state:
            - color: red
      - operator: ">"
        value: 30
        styles:
          state:
            - color: orange

  humidity_entity:
    icon: mdi:water-percent
    styles:
      icon:
        - color: blue
```

### Using Templates

```yaml
type: entities
entities:
  - type: custom:advanced-entities-row
    entity: sensor.temperature
    template: sensor_row
    entities:
      - entity: sensor.humidity
        template: humidity_entity
```

### Template Inheritance

Templates can inherit from other templates:

```yaml
advanced_entities_templates:
  base:
    styles:
      state:
        - font-weight: bold

  colored_base:
    template: base
    styles:
      state:
        - color: var(--accent-color)
```

### Variables

Define variables in templates and override them per instance:

```yaml
advanced_entities_templates:
  threshold_sensor:
    variables:
      warn_threshold: 30
      critical_threshold: 50
    state:
      - operator: ">="
        value: "[[[ return variables.critical_threshold ]]]"
        styles:
          state:
            - color: red
      - operator: ">="
        value: "[[[ return variables.warn_threshold ]]]"
        styles:
          state:
            - color: orange
```

```yaml
- type: custom:advanced-entities-row
  entity: sensor.cpu_usage
  template: threshold_sensor
  variables:
    warn_threshold: 60
    critical_threshold: 90
```

## JavaScript Templates

Use `[[[...]]]` syntax for JavaScript templates, just like in [button-card](https://github.com/custom-cards/button-card#javascript-templates). Templates have access to:

| Variable | Description |
|----------|-------------|
| `entity` | The current entity's state object |
| `states` | All entity states (proxy — auto-tracks dependencies) |
| `user` | Current HA user object |
| `hass` | The Home Assistant object |
| `variables` | Template variables |
| `html` | Lit `html` tag for rendering HTML |
| `helpers` | Helper functions (see below) |

### Examples

```yaml
- type: custom:advanced-entities-row
  entity: sensor.temperature
  name: "[[[ return entity.attributes.friendly_name.toUpperCase() ]]]"
  state_display: "[[[ return Math.round(entity.state) + '°C' ]]]"
  entities:
    - entity: sensor.humidity
      state_display: "[[[ return entity.state + '%' ]]]"
      styles:
        value:
          - color: >-
              [[[
                if (entity.state > 70) return 'red';
                if (entity.state > 50) return 'orange';
                return 'green';
              ]]]
```

### Template Helpers

Available via the `helpers` object:

- `helpers.localize(stateObj, state?)` — Localized state display
- `helpers.relativeTime(datetime)` — Relative time element
- `helpers.formatDateTime(datetime)` — Formatted date/time
- `helpers.formatDate(date)` — Formatted date
- `helpers.formatTime(time)` — Formatted time
- `helpers.formatDateNumeric(date)` — Numeric date
- `helpers.parseDuration(duration, format?, locale?)` — Parse duration string
- And more date/time formatting variants

## State Conditions

State conditions match against the entity's state and can override name, icon, styles, and display:

```yaml
state:
  - value: "on"
    icon: mdi:lightbulb
    styles:
      icon:
        - color: yellow
  - value: "off"
    icon: mdi:lightbulb-off
    styles:
      icon:
        - color: grey
```

### Operators

| Operator | Description |
|----------|-------------|
| (none) | Equals (`==`) |
| `==` | Equals |
| `!=` | Not equals |
| `<` | Less than |
| `<=` | Less than or equal |
| `>` | Greater than |
| `>=` | Greater than or equal |
| `regex` | Regular expression match |
| `template` | JavaScript template (return truthy/falsy) |
| `default` | Fallback if no other state matches |

```yaml
state:
  - operator: ">="
    value: 30
    styles:
      state:
        - color: red
  - operator: "template"
    value: "[[[ return entity.attributes.battery_level < 20 ]]]"
    icon: mdi:battery-alert
  - operator: "default"
    styles:
      state:
        - color: green
```

## Styles

Apply CSS styles to different parts of the row. Each style target accepts an array of CSS property objects.

### Style Targets

**Main row:**
| Target | Description |
|--------|-------------|
| `row` | The outer row element |
| `state` | Main entity state display |
| `name` | Entity name (in hui-generic-entity-row) |
| `secondary_info` | Secondary info text |
| `entities` | The entities container |

**Sub-entities:**
| Target | Description |
|--------|-------------|
| `container` | The sub-entity wrapper div |
| `name` | Sub-entity name label |
| `value` | Sub-entity state value |
| `icon` | Sub-entity icon |

### Example

```yaml
- type: custom:advanced-entities-row
  entity: light.living_room
  styles:
    state:
      - font-weight: bold
      - color: var(--primary-color)
    row:
      - background: var(--card-background-color)
  state:
    - value: "on"
      styles:
        state:
          - color: orange
    - value: "off"
      styles:
        state:
          - color: var(--disabled-text-color)
  entities:
    - entity: sensor.living_room_temp
      styles:
        value:
          - color: "[[[ return entity.state > 25 ? 'red' : 'green' ]]]"
        name:
          - font-size: 9px
```

## Actions

Actions use the [button-card action system](https://github.com/custom-cards/button-card#action). Available on the main entity and each sub-entity via `tap_action`, `hold_action`, and `double_tap_action`.

### Action Types

| Action | Description |
|--------|-------------|
| `none` | No action |
| `toggle` | Toggle the entity |
| `more-info` | Open the more-info dialog |
| `navigate` | Navigate to a path |
| `url` | Open a URL |
| `call-service` | Call a Home Assistant service |
| `perform-action` | Perform an action (newer HA) |
| `assist` | Open the voice assistant |
| `javascript` | Execute JavaScript |
| `multi-actions` | Execute multiple actions in sequence |
| `toast` | Show a toast notification |
| `fire-dom-event` | Fire a custom DOM event |

### Examples

```yaml
- type: custom:advanced-entities-row
  entity: light.living_room
  tap_action:
    action: toggle
  hold_action:
    action: more-info
  double_tap_action:
    action: call-service
    service: light.turn_on
    data:
      brightness_pct: 100
      entity_id: entity
  entities:
    - entity: light.bedroom
      tap_action:
        action: toggle
      hold_action:
        action: navigate
        navigation_path: /lovelace/bedroom
```

### JavaScript Action

```yaml
tap_action:
  action: javascript
  javascript: |
    const entity_id = entity.entity_id;
    hass.callService('light', 'toggle', { entity_id });
```

### Multi-Actions

```yaml
tap_action:
  action: multi-actions
  actions:
    - action: call-service
      service: light.turn_on
      data:
        entity_id: light.living_room
    - delay: 500
    - action: call-service
      service: light.turn_on
      data:
        entity_id: light.bedroom
```

## Full Example

```yaml
advanced_entities_templates:
  climate_row:
    variables:
      low: 18
      high: 25
    styles:
      state:
        - font-weight: bold
    state:
      - operator: "<"
        value: "[[[ return variables.low ]]]"
        styles:
          state:
            - color: blue
      - operator: ">"
        value: "[[[ return variables.high ]]]"
        styles:
          state:
            - color: red
      - operator: "default"
        styles:
          state:
            - color: green

type: entities
title: Climate
entities:
  - type: custom:advanced-entities-row
    entity: sensor.living_room_temperature
    template: climate_row
    name: Living Room
    entities:
      - entity: sensor.living_room_humidity
        name: Humidity
        styles:
          value:
            - color: "[[[ return entity.state > 60 ? 'orange' : 'inherit' ]]]"
      - entity: binary_sensor.living_room_window
        icon: true
        hide_if: "off"

  - type: custom:advanced-entities-row
    entity: sensor.bedroom_temperature
    template: climate_row
    name: Bedroom
    variables:
      low: 16
      high: 22
    entities:
      - entity: sensor.bedroom_humidity
        name: Humidity
```

## Credits

This project builds on the work of:

- [lovelace-multiple-entity-row](https://github.com/benct/lovelace-multiple-entity-row) by [@benct](https://github.com/benct) — Row layout and entity display
- [button-card](https://github.com/custom-cards/button-card) by [@custom-cards](https://github.com/custom-cards) — Template system, state conditions, styling, and actions

## License

MIT

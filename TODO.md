# TODO

- Create a new HA custom component that can be installed via HACS
- The component should be based on the lovelace-multiple-entity-row existing component (source in archive/lovelace-multiple-entity-row)
- The new component should extend the lovelace-multiple-entity-row with features from button-card (source in archive/button-card)
  - Features should include:
    - templates for entities like in button-card (for the main entity and all the sub-entities)
    - replacement of icon, style, name etc. like in button card

Additional Infos:
1. Component Name: advanced-entities
2. TypeScript preferred, but if using existing code in other languages makes it faster, it is ok.
3. Template scope: the full template system would be nice, to reuse the doc.
4. Styling scop: full would be preferred
5. State conditions: all state conditions would be great to have
6. Actions: Should be like in button-card. the ones from multiple-entity-row are not necessary
7. Features: No nested cards are needed and no lock/PIN protection or live stream support.
8. Build tooling: let's go with rollup
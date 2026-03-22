import { HassEntity } from 'home-assistant-js-websocket';
import { StyleInfo } from 'lit-html/directives/style-map.js';
import { StateConfig, StylesConfig } from './types/types';
import { TemplateContext, getTemplateOrValue } from './template-engine';

export function buildStyleGeneric(
  ctx: TemplateContext,
  state: HassEntity | undefined,
  baseStyles: StylesConfig | undefined,
  configState: StateConfig | undefined,
  styleType: string,
): StyleInfo {
  let style: any = {};
  if (baseStyles?.[styleType as keyof StylesConfig]) {
    style = Object.assign(style, ...(baseStyles[styleType as keyof StylesConfig] as any[]));
  }
  if (configState?.styles?.[styleType as keyof StylesConfig]) {
    let configStateStyle: StyleInfo = {};
    configStateStyle = Object.assign(configStateStyle, ...(configState.styles[styleType as keyof StylesConfig] as any[]));
    style = {
      ...style,
      ...configStateStyle,
    };
  }
  Object.keys(style).forEach((key) => {
    style[key] = getTemplateOrValue(ctx, state, style[key]);
  });
  return style;
}

import { html } from 'lit';
import { HassEntities, HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant } from './types/homeassistant';
import { EvaluatedVariables } from './types/types';
import copy from 'fast-copy';
import {
  formatDateTime,
  formatDateTimeNumeric,
  formatDateTimeWithSeconds,
  formatShortDateTime,
  formatShortDateTimeWithYear,
} from './common/format_date_time';
import { formatTime, formatTime24h, formatTimeWeekday, formatTimeWithSeconds } from './common/format_time';
import {
  formatDate,
  formatDateMonth,
  formatDateMonthYear,
  formatDateNumeric,
  formatDateShort,
  formatDateWeekday,
  formatDateWeekdayDay,
  formatDateWeekdayShort,
  formatDateYear,
} from './common/format_date';
import { parseDuration } from './common/parse-duration';
import { computeStateDisplay } from './common/compute_state_display';

export interface TemplateContext {
  hass: HomeAssistant;
  pHass: HomeAssistant;
  pStates: HassEntities;
  stateObj: HassEntity | undefined;
  pVariables: any;
  evaluatedVariables: EvaluatedVariables;
}

function getTemplateHelpers(ctx: TemplateContext) {
  const localize = (
    stateObj: HassEntity,
    state?: string,
    _numeric_precision?: number | 'card',
    show_units = true,
    units?: string,
  ): string => {
    return computeStateDisplay(
      ctx.hass.localize,
      stateObj,
      ctx.hass.locale,
      ctx.hass.config,
      ctx.hass.entities,
      { show_units, units },
      state,
    );
  };

  return {
    localize,
    formatDateTime: (datetime: string) =>
      formatDateTime(new Date(datetime), ctx.hass.locale, ctx.hass.config),
    formatShortDateTimeWithYear: (datetime: string) =>
      formatShortDateTimeWithYear(new Date(datetime), ctx.hass.locale, ctx.hass.config),
    formatShortDateTime: (datetime: string) =>
      formatShortDateTime(new Date(datetime), ctx.hass.locale, ctx.hass.config),
    formatDateTimeWithSeconds: (datetime: string) =>
      formatDateTimeWithSeconds(new Date(datetime), ctx.hass.locale, ctx.hass.config),
    formatDateTimeNumeric: (datetime: string) =>
      formatDateTimeNumeric(new Date(datetime), ctx.hass.locale, ctx.hass.config),
    relativeTime: (date: string | undefined) => {
      if (date) {
        return html`<ha-relative-time
          .hass="${ctx.hass}"
          .datetime="${date}"
          capitalize
        ></ha-relative-time>`;
      }
      return '';
    },
    formatTime: (time: string) =>
      formatTime(new Date(time), ctx.hass.locale, ctx.hass.config),
    formatTimeWithSeconds: (time: string) =>
      formatTimeWithSeconds(new Date(time), ctx.hass.locale, ctx.hass.config),
    formatTimeWeekday: (time: string) =>
      formatTimeWeekday(new Date(time), ctx.hass.locale, ctx.hass.config),
    formatTime24h: (time: string) =>
      formatTime24h(new Date(time), ctx.hass.locale, ctx.hass.config),
    formatDateWeekdayDay: (date: string) =>
      formatDateWeekdayDay(new Date(date), ctx.hass.locale, ctx.hass.config),
    formatDate: (date: string) =>
      formatDate(new Date(date), ctx.hass.locale, ctx.hass.config),
    formatDateNumeric: (date: string) =>
      formatDateNumeric(new Date(date), ctx.hass.locale, ctx.hass.config),
    formatDateShort: (date: string) =>
      formatDateShort(new Date(date), ctx.hass.locale, ctx.hass.config),
    formatDateMonthYear: (date: string) =>
      formatDateMonthYear(new Date(date), ctx.hass.locale, ctx.hass.config),
    formatDateMonth: (date: string) =>
      formatDateMonth(new Date(date), ctx.hass.locale, ctx.hass.config),
    formatDateYear: (date: string) =>
      formatDateYear(new Date(date), ctx.hass.locale, ctx.hass.config),
    formatDateWeekday: (date: string) =>
      formatDateWeekday(new Date(date), ctx.hass.locale, ctx.hass.config),
    formatDateWeekdayShort: (date: string) =>
      formatDateWeekdayShort(new Date(date), ctx.hass.locale, ctx.hass.config),
    parseDuration: (duration: string, format = 'ms', locale = ctx.hass.locale?.language) =>
      parseDuration(duration, format, locale),
  };
}

export function evalTemplate(ctx: TemplateContext, state: HassEntity | undefined, func: any): any {
  try {
    return new Function(
      'states',
      'entity',
      'user',
      'hass',
      'variables',
      'html',
      'helpers',
      `'use strict'; ${func}`,
    ).call(
      null,
      ctx.pStates,
      state,
      ctx.hass.user,
      ctx.pHass,
      ctx.pVariables,
      html,
      getTemplateHelpers(ctx),
    );
  } catch (e: any) {
    const funcTrimmed = func.length <= 100 ? func.trim() : `${func.trim().substring(0, 98)}...`;
    e.message = `${e.name}: ${e.message} in '${funcTrimmed}'`;
    e.name = 'AdvancedEntitiesJSTemplateError';
    throw e;
  }
}

export function getTemplateOrValue(ctx: TemplateContext, state: HassEntity | undefined, value: any | undefined): any | undefined {
  if (['number', 'boolean', 'function'].includes(typeof value)) return value;
  if (!value) return value;
  if (typeof value === 'object') {
    Object.keys(value).forEach((key) => {
      value[key] = getTemplateOrValue(ctx, state, value[key]);
    });
    return value;
  }
  const trimmed = value.trim();
  const rx = new RegExp('^(\\[{3,})(.*?)(\\]{3,})$', 's');
  const match = trimmed.match(rx);
  if (match && match.length === 4) {
    if (match[1].length === 3 && match[3].length === 3) {
      return evalTemplate(ctx, state, match[2]);
    } else if (match[1].length === match[3].length) {
      return trimmed.slice(1, -1);
    } else {
      return value;
    }
  } else {
    return value;
  }
}

export function objectEvalTemplate(ctx: TemplateContext, state: HassEntity | undefined, obj: any | undefined): any {
  const objClone = copy(obj);
  return getTemplateOrValue(ctx, state, objClone);
}

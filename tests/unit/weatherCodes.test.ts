import { describe, expect, it } from 'vitest';

import { getWeatherCondition } from '../../src/lib/weatherCodes';

describe('weatherCodes', () => {
  it('returns the mapped condition for a known WMO code', () => {
    expect(getWeatherCondition(61)).toEqual({ label: 'Chuva leve', icon: '🌧️' });
  });

  it('returns a safe fallback for an unknown code', () => {
    expect(getWeatherCondition(999)).toEqual({
      label: 'Condição desconhecida',
      icon: '🌡️',
    });
  });
});
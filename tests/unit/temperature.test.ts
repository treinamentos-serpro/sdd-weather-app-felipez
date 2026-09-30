import { describe, expect, it } from 'vitest';

import {
  convertTemperature,
  displayTemperature,
  formatTemperature,
  unitLabel,
} from '../../src/lib/temperature';

describe('temperature helpers', () => {
  it.each([
    [0, 32],
    [100, 212],
    [-40, -40],
  ])('converts %d°C to %d°F', (celsius, fahrenheit) => {
    expect(convertTemperature(celsius, 'fahrenheit')).toBe(fahrenheit);
  });

  it('keeps Celsius values unchanged for the Celsius unit', () => {
    expect(convertTemperature(24.5, 'celsius')).toBe(24.5);
  });

  it('converts by the requested unit', () => {
    expect(convertTemperature(20, 'celsius')).toBe(20);
    expect(convertTemperature(20, 'fahrenheit')).toBe(68);
  });

  it('keeps displayTemperature compatible with the conversion helper', () => {
    expect(displayTemperature(20, 'fahrenheit')).toBe(68);
  });

  it('rounds the value and appends the unit symbol', () => {
    expect(formatTemperature(24.6, 'celsius')).toBe('25°C');
    expect(formatTemperature(24.4, 'fahrenheit')).toBe('76°F');
  });

  it('returns the correct unit label', () => {
    expect(unitLabel('celsius')).toBe('°C');
    expect(unitLabel('fahrenheit')).toBe('°F');
  });
});
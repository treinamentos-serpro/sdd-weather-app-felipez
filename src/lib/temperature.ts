import type { Unit } from '../types/weather';

export function convertTemperature(temperatureCelsius: number, unit: Unit): number {
  if (unit === 'fahrenheit') {
    return (temperatureCelsius * 9) / 5 + 32;
  }

  return temperatureCelsius;
}

export function displayTemperature(temperatureCelsius: number, unit: Unit): number {
  return convertTemperature(temperatureCelsius, unit);
}

export function unitLabel(unit: Unit): string {
  return unit === 'fahrenheit' ? '°F' : '°C';
}

export function formatTemperature(temperatureCelsius: number, unit: Unit): string {
  return `${Math.round(convertTemperature(temperatureCelsius, unit))}${unitLabel(unit)}`;
}

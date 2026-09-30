export type Unit = 'celsius' | 'fahrenheit';

export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  countryCode: string;
  region?: string;
  timezone?: string;
  elevationMeters?: number;
}

export interface CurrentWeather {
  temperatureCelsius: number;
  weatherCode: number;
  observedAt: string;
  isDay: boolean;
  apparentTemperatureCelsius?: number;
  relativeHumidityPercent?: number;
  precipitationMm?: number;
  pressureHPa?: number;
  windSpeedKmh?: number;
}

export interface ForecastDay {
  date: string;
  weatherCode: number;
  temperatureMinCelsius: number;
  temperatureMaxCelsius: number;
  precipitationProbabilityPercent?: number;
  precipitationSumMm?: number;
  windSpeedMaxKmh?: number;
  sunrise?: string;
  sunset?: string;
}

export interface WeatherData {
  city: City;
  current: CurrentWeather;
  forecast: ForecastDay[];
  timezone: string;
  fetchedAt: string;
}

export const mockWeatherData: WeatherData = {
  city: {
    id: 3451190,
    name: 'Sao Paulo',
    latitude: -23.5505,
    longitude: -46.6333,
    country: 'Brazil',
    countryCode: 'BR',
    region: 'Sao Paulo',
    timezone: 'America/Sao_Paulo',
    elevationMeters: 760,
  },
  current: {
    temperatureCelsius: 24.1,
    weatherCode: 1,
    observedAt: '2026-09-30T12:00',
    isDay: true,
    apparentTemperatureCelsius: 24.5,
    relativeHumidityPercent: 68,
    precipitationMm: 0,
    pressureHPa: 1012,
    windSpeedKmh: 12.4,
  },
  forecast: [
    {
      date: '2026-09-30',
      weatherCode: 1,
      temperatureMinCelsius: 19.2,
      temperatureMaxCelsius: 27.3,
      precipitationProbabilityPercent: 10,
      precipitationSumMm: 0,
      windSpeedMaxKmh: 18,
      sunrise: '2026-09-30T05:45',
      sunset: '2026-09-30T17:48',
    },
    {
      date: '2026-10-01',
      weatherCode: 2,
      temperatureMinCelsius: 19.8,
      temperatureMaxCelsius: 28.1,
      precipitationProbabilityPercent: 20,
      precipitationSumMm: 0.2,
      windSpeedMaxKmh: 20.4,
      sunrise: '2026-10-01T05:44',
      sunset: '2026-10-01T17:48',
    },
    {
      date: '2026-10-02',
      weatherCode: 3,
      temperatureMinCelsius: 20.1,
      temperatureMaxCelsius: 26.9,
      precipitationProbabilityPercent: 40,
      precipitationSumMm: 1.5,
      windSpeedMaxKmh: 22.1,
      sunrise: '2026-10-02T05:43',
      sunset: '2026-10-02T17:49',
    },
    {
      date: '2026-10-03',
      weatherCode: 61,
      temperatureMinCelsius: 18.7,
      temperatureMaxCelsius: 24.5,
      precipitationProbabilityPercent: 70,
      precipitationSumMm: 8.1,
      windSpeedMaxKmh: 25,
      sunrise: '2026-10-03T05:42',
      sunset: '2026-10-03T17:49',
    },
    {
      date: '2026-10-04',
      weatherCode: 0,
      temperatureMinCelsius: 19.4,
      temperatureMaxCelsius: 27.8,
      precipitationProbabilityPercent: 5,
      precipitationSumMm: 0,
      windSpeedMaxKmh: 16.2,
      sunrise: '2026-10-04T05:41',
      sunset: '2026-10-04T17:50',
    },
  ],
  timezone: 'America/Sao_Paulo',
  fetchedAt: '2026-09-30T12:00:00Z',
};

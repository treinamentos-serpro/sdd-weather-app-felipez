import type { City, CurrentWeather, ForecastDay, WeatherData } from '../types/weather';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const REQUEST_TIMEOUT_MS = 10_000;

interface GeocodingResult {
  id?: number | null;
  name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  country?: string | null;
  country_code?: string | null;
  admin1?: string | null;
  timezone?: string | null;
  elevation?: number | null;
}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

interface ForecastResponse {
  timezone?: string;
  current?: {
    time?: string;
    temperature_2m?: number | null;
    weather_code?: number | null;
    is_day?: number | null;
    apparent_temperature?: number | null;
    relative_humidity_2m?: number | null;
    precipitation?: number | null;
    pressure_msl?: number | null;
    wind_speed_10m?: number | null;
  };
  daily?: {
    time?: Array<string | null>;
    weather_code?: Array<number | null>;
    temperature_2m_min?: Array<number | null>;
    temperature_2m_max?: Array<number | null>;
    precipitation_probability_max?: Array<number | null>;
    precipitation_sum?: Array<number | null>;
    wind_speed_10m_max?: Array<number | null>;
    sunrise?: Array<string | null>;
    sunset?: Array<string | null>;
  };
}

export class WeatherServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherServiceError';
  }
}

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'name' in error && error.name === 'AbortError') {
      throw new WeatherServiceError('A requisição demorou demais.');
    }

    throw new WeatherServiceError('Falha de rede.');
  } finally {
    clearTimeout(timeoutId);
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  try {
    return (await response.json()) as T;
  } catch {
    throw new WeatherServiceError('Resposta inválida do serviço de clima.');
  }
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isValidGeocodingResult(result: unknown): result is GeocodingResult & {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
} {
  if (typeof result !== 'object' || result === null) {
    return false;
  }

  const candidate = result as GeocodingResult;
  return (
    isFiniteNumber(candidate.id) &&
    typeof candidate.name === 'string' &&
    candidate.name.length > 0 &&
    isFiniteNumber(candidate.latitude) &&
    isFiniteNumber(candidate.longitude)
  );
}

function hasFiveFiniteNumbers(values: Array<number | null> | undefined): values is number[] {
  return Boolean(
    Array.isArray(values) &&
      values.length >= 5 &&
      values.slice(0, 5).every((value) => isFiniteNumber(value)),
  );
}

function hasFiveDates(values: Array<string | null> | undefined): values is string[] {
  return Boolean(
    Array.isArray(values) &&
      values.length >= 5 &&
      values.slice(0, 5).every((value) => typeof value === 'string' && !Number.isNaN(Date.parse(value))),
  );
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export async function searchCities(name: string): Promise<City[]> {
  const normalizedName = name.trim();
  if (!normalizedName) {
    return [];
  }

  const encodedName = encodeURIComponent(normalizedName);
  const response = await fetchWithTimeout(
    `${GEOCODING_URL}?name=${encodedName}&count=10&language=pt&format=json`,
  );

  if (!response.ok) {
    throw new WeatherServiceError('Não foi possível buscar cidades.');
  }

  const data = await parseJson<GeocodingResponse>(response);

  if (!isObject(data) || (data.results !== undefined && !Array.isArray(data.results))) {
    throw new WeatherServiceError('Resposta inválida do serviço de localização.');
  }

  return (data.results ?? []).filter(isValidGeocodingResult).map((result) => ({
    id: result.id,
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country ?? '—',
    countryCode: result.country_code ?? '—',
    region: result.admin1 ?? undefined,
    timezone: result.timezone ?? undefined,
    elevationMeters: result.elevation ?? undefined,
  }));
}

export async function getWeather(city: City): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current:
      'temperature_2m,weather_code,is_day,apparent_temperature,relative_humidity_2m,precipitation,pressure_msl,wind_speed_10m',
    daily:
      'weather_code,temperature_2m_min,temperature_2m_max,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,sunrise,sunset',
    forecast_days: '5',
    timezone: 'auto',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
  });
  const response = await fetchWithTimeout(`${FORECAST_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new WeatherServiceError('Não foi possível carregar a previsão.');
  }

  const data = await parseJson<ForecastResponse>(response);
  if (!isObject(data)) {
    throw new WeatherServiceError('Resposta inválida do serviço de clima.');
  }

  const current = data.current;
  const daily = data.daily;

  if (!current || !daily) {
    throw new WeatherServiceError('Os dados da previsão estão incompletos.');
  }

  const dailyTime = daily.time;
  const dailyWeatherCodes = daily.weather_code;
  const dailyTemperatureMin = daily.temperature_2m_min;
  const dailyTemperatureMax = daily.temperature_2m_max;
  if (
    !hasFiveDates(dailyTime) ||
    !hasFiveFiniteNumbers(dailyWeatherCodes) ||
    !hasFiveFiniteNumbers(dailyTemperatureMin) ||
    !hasFiveFiniteNumbers(dailyTemperatureMax) ||
    !isFiniteNumber(current.temperature_2m) ||
    !isFiniteNumber(current.weather_code) ||
    typeof current.time !== 'string' ||
    Number.isNaN(Date.parse(current.time)) ||
    !isFiniteNumber(current.is_day)
  ) {
    throw new WeatherServiceError('Os dados da previsão estão incompletos.');
  }

  const currentWeather: CurrentWeather = {
    temperatureCelsius: current.temperature_2m,
    weatherCode: current.weather_code,
    observedAt: current.time,
    isDay: current.is_day === 1,
    apparentTemperatureCelsius: current.apparent_temperature ?? undefined,
    relativeHumidityPercent: current.relative_humidity_2m ?? undefined,
    precipitationMm: current.precipitation ?? 0,
    pressureHPa: current.pressure_msl ?? undefined,
    windSpeedKmh: current.wind_speed_10m ?? undefined,
  };

  const forecast: ForecastDay[] = dailyTime.slice(0, 5).map((date, index) => ({
    date,
    weatherCode: dailyWeatherCodes[index],
    temperatureMinCelsius: dailyTemperatureMin[index],
    temperatureMaxCelsius: dailyTemperatureMax[index],
    precipitationProbabilityPercent: daily.precipitation_probability_max?.[index] ?? 0,
    precipitationSumMm: daily.precipitation_sum?.[index] ?? 0,
    windSpeedMaxKmh: daily.wind_speed_10m_max?.[index] ?? undefined,
    sunrise: daily.sunrise?.[index] ?? undefined,
    sunset: daily.sunset?.[index] ?? undefined,
  }));

  return {
    city,
    current: currentWeather,
    forecast,
    timezone: data.timezone ?? city.timezone ?? 'UTC',
    fetchedAt: new Date().toISOString(),
  };
}
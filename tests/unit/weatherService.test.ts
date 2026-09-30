import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  fetchWithTimeout,
  getWeather,
  searchCities,
} from '../../src/services/weatherService';
import type { City } from '../../src/types/weather';

describe('weatherService', () => {
  const city: City = {
    id: 3451190,
    name: 'São Paulo',
    latitude: -23.5505,
    longitude: -46.6333,
    country: 'Brasil',
    countryCode: 'BR',
    timezone: 'America/Sao_Paulo',
  };

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('returns an empty list without calling the network for blank input', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await expect(searchCities('   ')).resolves.toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('encodes the city name and maps geocoding results to City', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          results: [
            {
              id: 3451190,
              name: 'São Paulo',
              latitude: -23.5505,
              longitude: -46.6333,
              country: 'Brasil',
              country_code: 'BR',
              admin1: 'São Paulo',
              timezone: 'America/Sao_Paulo',
              elevation: 760,
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    await expect(searchCities('São Paulo')).resolves.toEqual([
      {
        id: 3451190,
        name: 'São Paulo',
        latitude: -23.5505,
        longitude: -46.6333,
        country: 'Brasil',
        countryCode: 'BR',
        region: 'São Paulo',
        timezone: 'America/Sao_Paulo',
        elevationMeters: 760,
      },
    ]);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://geocoding-api.open-meteo.com/v1/search?name=S%C3%A3o%20Paulo&count=10&language=pt&format=json',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('throws WeatherServiceError for a non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 503 })));

    await expect(searchCities('Lisboa')).rejects.toThrow('Não foi possível buscar cidades.');
  });

  it('throws WeatherServiceError when forecast responds with a non-ok status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 502 })));

    await expect(getWeather(city)).rejects.toThrow('Não foi possível carregar a previsão.');
  });

  it('returns an empty list when geocoding results are absent', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 200 })));

    await expect(searchCities('Cidade desconhecida')).resolves.toEqual([]);
  });

  it('maps current and five parallel daily arrays to WeatherData', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          timezone: 'America/Sao_Paulo',
          current: {
            time: '2026-09-30T12:00',
            temperature_2m: 24.1,
            weather_code: 1,
            is_day: 1,
            apparent_temperature: 24.5,
            relative_humidity_2m: 68,
            precipitation: 0,
            pressure_msl: 1012,
            wind_speed_10m: 12.4,
          },
          daily: {
            time: ['2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04'],
            weather_code: [1, 2, 3, 61, 0],
            temperature_2m_min: [19.2, 19.8, 20.1, 18.7, 19.4],
            temperature_2m_max: [27.3, 28.1, 26.9, 24.5, 27.8],
            precipitation_probability_max: [10, 20, 40, 70, 5],
            precipitation_sum: [0, 0.2, 1.5, 8.1, 0],
            wind_speed_10m_max: [18, 20.4, 22.1, 25, 16.2],
            sunrise: ['05:45', '05:44', '05:43', '05:42', '05:41'],
            sunset: ['17:48', '17:48', '17:49', '17:49', '17:50'],
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    const weather = await getWeather(city);

    expect(weather.city).toEqual(city);
    expect(weather.current).toMatchObject({
      temperatureCelsius: 24.1,
      weatherCode: 1,
      observedAt: '2026-09-30T12:00',
      isDay: true,
      pressureHPa: 1012,
    });
    expect(weather.forecast).toHaveLength(5);
    expect(weather.forecast[3]).toMatchObject({
      date: '2026-10-03',
      weatherCode: 61,
      temperatureMinCelsius: 18.7,
      temperatureMaxCelsius: 24.5,
      precipitationProbabilityPercent: 70,
    });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('current='),
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('daily='),
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('normalizes null precipitation values to zero', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            current: {
              time: '2026-09-30T12:00',
              temperature_2m: 20,
              weather_code: 0,
              is_day: 1,
              precipitation: null,
            },
            daily: {
              time: ['2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04'],
              weather_code: [0, 0, 0, 0, 0],
              temperature_2m_min: [10, 10, 10, 10, 10],
              temperature_2m_max: [20, 20, 20, 20, 20],
              precipitation_sum: [null, null, null, null, null],
            },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        ),
      ),
    );

    const weather = await getWeather(city);

    expect(weather.current.precipitationMm).toBe(0);
    expect(weather.forecast.every((day) => day.precipitationSumMm === 0)).toBe(true);
  });

  it.each([
    { response: { daily: {} }, label: 'current' },
    { response: { current: {} }, label: 'daily' },
    { response: { current: {}, daily: {} }, label: 'required fields' },
  ])('throws for an incomplete $label response', async ({ response }) => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(response), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    await expect(getWeather(city)).rejects.toThrow('Os dados da previsão estão incompletos.');
  });

  it('converts network failures to WeatherServiceError', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    await expect(fetchWithTimeout('https://example.test')).rejects.toThrow('Falha de rede.');
  });

  it('converts invalid JSON responses to WeatherServiceError', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{invalid', { status: 200 })));

    await expect(searchCities('Lisboa')).rejects.toThrow('Resposta inválida do serviço de clima.');
  });

  it('converts AbortError after ten seconds and clears the timeout', async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'fetch',
      vi.fn((_input: RequestInfo | URL, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
          });
        }),
      ),
    );

    const request = fetchWithTimeout('https://example.test');
    const result = expect(request).rejects.toThrow('A requisição demorou demais.');

    await vi.advanceTimersByTimeAsync(10_000);
    await result;

    expect(vi.getTimerCount()).toBe(0);
  });

  it('clears the timeout after a successful response', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 200 })));

    await fetchWithTimeout('https://example.test');

    expect(vi.getTimerCount()).toBe(0);
  });
});
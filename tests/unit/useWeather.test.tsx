import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useWeather } from '../../src/hooks/useWeather';
import { mockWeatherData, type City } from '../../src/types/weather';

const serviceMocks = vi.hoisted(() => ({
  getWeather: vi.fn(),
  searchCities: vi.fn(),
}));

vi.mock('../../src/services/weatherService', () => ({
  getWeather: serviceMocks.getWeather,
  searchCities: serviceMocks.searchCities,
  WeatherServiceError: class WeatherServiceError extends Error {},
}));

describe('useWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts idle with no data or error', () => {
    const { result } = renderHook(() => useWeather());

    expect(result.current.status).toBe('idle');
    expect(result.current.data).toBeNull();
    expect(result.current.cities).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.query).toBe('');
  });

  it('searches cities and loads the first result', async () => {
    serviceMocks.searchCities.mockResolvedValue([mockWeatherData.city]);
    serviceMocks.getWeather.mockResolvedValue(mockWeatherData);
    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.search('São Paulo');
    });

    expect(serviceMocks.searchCities).toHaveBeenCalledWith('São Paulo');
    expect(serviceMocks.getWeather).toHaveBeenCalledWith(mockWeatherData.city);
    expect(result.current.status).toBe('success');
    expect(result.current.data).toEqual(mockWeatherData);
    expect(result.current.cities).toEqual([mockWeatherData.city]);
    expect(result.current.query).toBe('São Paulo');
  });

  it('uses empty status and does not request weather when no city is found', async () => {
    serviceMocks.searchCities.mockResolvedValue([]);
    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.search('Cidade inexistente');
    });

    expect(result.current.status).toBe('empty');
    expect(result.current.data).toBeNull();
    expect(serviceMocks.getWeather).not.toHaveBeenCalled();
  });

  it('sets error and retries the last search operation', async () => {
    serviceMocks.searchCities
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce([mockWeatherData.city]);
    serviceMocks.getWeather.mockResolvedValue(mockWeatherData);
    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.search('São Paulo');
    });
    expect(result.current.status).toBe('error');
    expect(result.current.error).not.toBeNull();

    await act(async () => {
      await result.current.retry();
    });

    expect(result.current.status).toBe('success');
    expect(serviceMocks.searchCities).toHaveBeenCalledTimes(2);
  });

  it('loads weather for an explicitly selected city', async () => {
    const selectedCity: City = { ...mockWeatherData.city, name: 'Campinas' };
    serviceMocks.getWeather.mockResolvedValue({ ...mockWeatherData, city: selectedCity });
    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.selectCity(selectedCity);
    });

    expect(serviceMocks.getWeather).toHaveBeenCalledWith(selectedCity);
    expect(result.current.status).toBe('success');
    expect(result.current.data?.city).toEqual(selectedCity);
  });

  it('ignores a forecast response from an older selected city', async () => {
    const firstCity: City = { ...mockWeatherData.city, name: 'Cidade antiga' };
    const secondCity: City = { ...mockWeatherData.city, name: 'Cidade atual' };
    const firstWeather = { ...mockWeatherData, city: firstCity };
    const secondWeather = { ...mockWeatherData, city: secondCity };
    let resolveFirst!: (weather: typeof firstWeather) => void;
    let resolveSecond!: (weather: typeof secondWeather) => void;
    const firstRequest = new Promise<typeof firstWeather>((resolve) => {
      resolveFirst = resolve;
    });
    const secondRequest = new Promise<typeof secondWeather>((resolve) => {
      resolveSecond = resolve;
    });
    serviceMocks.getWeather.mockImplementation((selected: City) =>
      selected.name === firstCity.name ? firstRequest : secondRequest,
    );
    const { result } = renderHook(() => useWeather());

    const firstOperation = result.current.selectCity(firstCity);
    const secondOperation = result.current.selectCity(secondCity);

    await act(async () => {
      resolveSecond(secondWeather);
      await secondOperation;
    });
    await act(async () => {
      resolveFirst(firstWeather);
      await firstOperation;
    });

    expect(result.current.status).toBe('success');
    expect(result.current.data?.city.name).toBe(secondCity.name);
  });
});
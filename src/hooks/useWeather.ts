import { useCallback, useRef, useState } from 'react';

import { getWeather, searchCities, WeatherServiceError } from '../services/weatherService';
import type { City, WeatherData } from '../types/weather';

export type WeatherStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export interface UseWeatherResult {
  status: WeatherStatus;
  data: WeatherData | null;
  cities: City[];
  error: WeatherServiceError | null;
  query: string;
  search: (name: string) => Promise<void>;
  selectCity: (city: City) => Promise<void>;
  retry: () => Promise<void>;
}

type Operation = () => Promise<void>;

function toWeatherServiceError(error: unknown): WeatherServiceError {
  if (error instanceof WeatherServiceError) {
    return error;
  }

  return new WeatherServiceError('Falha de rede.');
}

export function useWeather(): UseWeatherResult {
  const [status, setStatus] = useState<WeatherStatus>('idle');
  const [data, setData] = useState<WeatherData | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<WeatherServiceError | null>(null);
  const [query, setQuery] = useState('');
  const requestIdRef = useRef(0);
  const lastOperationRef = useRef<Operation | null>(null);

  const loadWeather = useCallback(async (city: City, requestId: number) => {
    const weather = await getWeather(city);
    if (requestId !== requestIdRef.current) {
      return;
    }

    setData(weather);
    setError(null);
    setStatus('success');
  }, []);

  const selectCity = useCallback(
    async (city: City) => {
      const operation: Operation = async () => {
        const requestId = ++requestIdRef.current;
        setStatus('loading');
        setData(null);
        setError(null);

        try {
          await loadWeather(city, requestId);
        } catch (reason) {
          if (requestId !== requestIdRef.current) {
            return;
          }

          setError(toWeatherServiceError(reason));
          setStatus('error');
        }
      };

      lastOperationRef.current = operation;
      await operation();
    },
    [loadWeather],
  );

  const search = useCallback(
    async (name: string) => {
      const normalizedName = name.trim();
      setQuery(normalizedName);

      const operation: Operation = async () => {
        const requestId = ++requestIdRef.current;
        setStatus('loading');
        setCities([]);
        setData(null);
        setError(null);

        if (!normalizedName) {
          setStatus('empty');
          return;
        }

        try {
          const foundCities = await searchCities(normalizedName);
          if (requestId !== requestIdRef.current) {
            return;
          }

          setCities(foundCities);
          if (foundCities.length === 0) {
            setStatus('empty');
            return;
          }

          await loadWeather(foundCities[0], requestId);
        } catch (reason) {
          if (requestId !== requestIdRef.current) {
            return;
          }

          setError(toWeatherServiceError(reason));
          setStatus('error');
        }
      };

      lastOperationRef.current = operation;
      await operation();
    },
    [loadWeather],
  );

  const retry = useCallback(async () => {
    if (lastOperationRef.current) {
      await lastOperationRef.current();
    }
  }, []);

  return {
    status,
    data,
    cities,
    error,
    query,
    search,
    selectCity,
    retry,
  };
}
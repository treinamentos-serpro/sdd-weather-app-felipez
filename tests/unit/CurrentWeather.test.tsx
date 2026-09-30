import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CurrentWeather from '../../src/components/CurrentWeather';
import { mockWeatherData } from '../../src/types/weather';

describe('CurrentWeather', () => {
  it('renders the current weather in Celsius', () => {
    render(
      <CurrentWeather
        city={mockWeatherData.city}
        current={mockWeatherData.current}
        unit="celsius"
      />,
    );

    expect(screen.getByRole('heading', { name: 'Sao Paulo' })).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('°C')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Predominantemente limpo' })).toBeInTheDocument();
    expect(screen.getByText('68%')).toBeInTheDocument();
    expect(screen.getByText('12.4 km/h')).toBeInTheDocument();
    expect(screen.getByText('0 mm')).toBeInTheDocument();
    expect(screen.getByText('1012 hPa')).toBeInTheDocument();
  });

  it('derives the Fahrenheit temperature from Celsius data', () => {
    render(
      <CurrentWeather
        city={mockWeatherData.city}
        current={mockWeatherData.current}
        unit="fahrenheit"
      />,
    );

    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('°F')).toBeInTheDocument();
  });

  it('shows a fallback for missing optional metrics', () => {
    render(
      <CurrentWeather
        city={mockWeatherData.city}
        current={{
          temperatureCelsius: 20,
          weatherCode: 0,
          observedAt: '2026-09-30T12:00',
          isDay: true,
        }}
        unit="celsius"
      />,
    );

    expect(screen.getAllByText('—')).toHaveLength(4);
  });
});

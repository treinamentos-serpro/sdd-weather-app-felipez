import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ForecastList from '../../src/components/ForecastList';
import { mockWeatherData } from '../../src/types/weather';

describe('ForecastList', () => {
  it('renders five forecast cards with conditions and rain probability', () => {
    render(<ForecastList forecast={mockWeatherData.forecast} unit="celsius" />);

    expect(screen.getByRole('heading', { name: 'Previsão para 5 dias' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(5);
    expect(screen.getAllByRole('img')).toHaveLength(5);
    expect(screen.getByText('Chuva: 10%')).toBeInTheDocument();
    expect(screen.getAllByText('27')).toHaveLength(2);
    expect(screen.getAllByText('°C')).toHaveLength(10);
  });

  it('derives maximum and minimum temperatures in Fahrenheit', () => {
    render(<ForecastList forecast={mockWeatherData.forecast} unit="fahrenheit" />);

    expect(screen.getByRole('group', { name: 'Máxima 81°F' })).toBeInTheDocument();
    expect(screen.getAllByRole('group', { name: 'Mínima 67°F' })).toHaveLength(2);
  });

  it('shows a fallback when rain probability is unavailable', () => {
    render(
      <ForecastList
        forecast={[{ ...mockWeatherData.forecast[0], precipitationProbabilityPercent: undefined }]}
        unit="celsius"
      />,
    );

    expect(screen.getByText('Chuva: —')).toBeInTheDocument();
  });
});

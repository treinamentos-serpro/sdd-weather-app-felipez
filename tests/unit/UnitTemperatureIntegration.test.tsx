import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import CurrentWeather from '../../src/components/CurrentWeather';
import UnitToggle from '../../src/components/UnitToggle';
import { mockWeatherData, type Unit } from '../../src/types/weather';

function WeatherWithUnitToggle() {
  const [unit, setUnit] = useState<Unit>('celsius');
  const current = {
    ...mockWeatherData.current,
    temperatureCelsius: 0,
  };

  return (
    <>
      <UnitToggle unit={unit} onChange={setUnit} />
      <CurrentWeather city={mockWeatherData.city} current={current} unit={unit} />
    </>
  );
}

describe('unit conversion in the weather presentation', () => {
  it('shows 32°F after selecting Fahrenheit from 0°C', async () => {
    const user = userEvent.setup();
    render(<WeatherWithUnitToggle />);

    expect(screen.getByText('0')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '°F' }));

    expect(screen.getByText('32')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '°F' })).toHaveAttribute('aria-pressed', 'true');
  });
});
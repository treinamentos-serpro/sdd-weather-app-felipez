import { displayTemperature } from '../lib/temperature';
import { getWeatherCondition } from '../lib/weatherCodes';
import type { City, CurrentWeather as CurrentWeatherData, Unit } from '../types/weather';

interface CurrentWeatherProps {
  city: City;
  current: CurrentWeatherData;
  unit: Unit;
}

function formatMetric(value: number | undefined, suffix: string): string {
  return value === undefined || !Number.isFinite(value) ? '—' : `${value}${suffix}`;
}

function CurrentWeather({ city, current, unit }: CurrentWeatherProps) {
  const condition = getWeatherCondition(current.weatherCode);
  const convertedTemperature = displayTemperature(current.temperatureCelsius, unit);
  const temperature = Number.isFinite(convertedTemperature) ? Math.round(convertedTemperature) : null;
  const temperatureUnit = unit === 'celsius' ? '°C' : '°F';

  return (
    <section
      aria-labelledby="current-weather-title"
      className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur-md sm:p-8"
    >
      <div className="flex min-w-0 flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="min-w-0 max-w-full">
          <p className="text-sm text-white/80">Clima atual</p>
          <h2 id="current-weather-title" className="mt-1 break-words text-2xl font-semibold">
            {city.name}
          </h2>
          <p className="break-words text-sm text-white/70">
            {city.region ? `${city.region}, ` : ''}
            {city.country}
          </p>
        </div>

        <div className="flex min-w-0 items-center gap-3">
          <span role="img" aria-label={condition.label} className="text-5xl">
            {condition.icon}
          </span>
          <div>
            <p
              role="group"
              aria-label={`Temperatura ${temperature ?? '—'}${temperatureUnit}`}
              className="whitespace-nowrap text-5xl font-semibold tracking-tight sm:text-6xl"
            >
              {temperature ?? '—'}
              <span className="ml-1 text-3xl text-white/70">{temperatureUnit}</span>
            </p>
            <p className="text-sm text-white/70">{condition.label}</p>
          </div>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="min-w-0 rounded-lg border border-white/10 bg-white/5 p-3">
          <dt className="text-xs text-white/70">Umidade</dt>
          <dd className="mt-1 break-words text-lg font-medium">
            {formatMetric(current.relativeHumidityPercent, '%')}
          </dd>
        </div>
        <div className="min-w-0 rounded-lg border border-white/10 bg-white/5 p-3">
          <dt className="text-xs text-white/70">Vento</dt>
          <dd className="mt-1 break-words text-lg font-medium">
            {formatMetric(current.windSpeedKmh, ' km/h')}
          </dd>
        </div>
        <div className="min-w-0 rounded-lg border border-white/10 bg-white/5 p-3">
          <dt className="text-xs text-white/70">Precipitação</dt>
          <dd className="mt-1 break-words text-lg font-medium">
            {formatMetric(current.precipitationMm, ' mm')}
          </dd>
        </div>
        <div className="min-w-0 rounded-lg border border-white/10 bg-white/5 p-3">
          <dt className="text-xs text-white/70">Pressão</dt>
          <dd className="mt-1 break-words text-lg font-medium">{formatMetric(current.pressureHPa, ' hPa')}</dd>
        </div>
      </dl>
    </section>
  );
}

export default CurrentWeather;

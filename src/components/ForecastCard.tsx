import { formatDayLabel } from '../lib/format';
import { displayTemperature } from '../lib/temperature';
import { getWeatherCondition } from '../lib/weatherCodes';
import type { ForecastDay, Unit } from '../types/weather';

interface ForecastCardProps {
  day: ForecastDay;
  unit: Unit;
}

function ForecastCard({ day, unit }: ForecastCardProps) {
  const condition = getWeatherCondition(day.weatherCode);
  const convertedMaximum = displayTemperature(day.temperatureMaxCelsius, unit);
  const convertedMinimum = displayTemperature(day.temperatureMinCelsius, unit);
  const maximum = Number.isFinite(convertedMaximum) ? Math.round(convertedMaximum) : null;
  const minimum = Number.isFinite(convertedMinimum) ? Math.round(convertedMinimum) : null;
  const temperatureUnit = unit === 'celsius' ? '°C' : '°F';
  const precipitationProbability = day.precipitationProbabilityPercent;

  return (
    <article className="flex min-h-48 min-w-0 flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-white backdrop-blur-md sm:p-4">
      <div>
        <h3 className="break-words text-sm font-medium capitalize text-white/80">{formatDayLabel(day.date)}</h3>
        <span role="img" aria-label={condition.label} className="mt-4 block text-4xl">
          {condition.icon}
        </span>
        <p className="mt-2 text-sm text-white/70">{condition.label}</p>
      </div>

      <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-lg font-semibold">
          <span role="group" aria-label={`Máxima ${maximum ?? '—'}${temperatureUnit}`}>
            {maximum ?? '—'}
            <span aria-hidden="true" className="ml-1 text-sm text-white/70">
              {temperatureUnit}
            </span>
          </span>
          <span
            role="group"
            aria-label={`Mínima ${minimum ?? '—'}${temperatureUnit}`}
            className="ml-2 text-sm font-normal text-white/50"
          >
            {minimum ?? '—'}
            <span aria-hidden="true">{temperatureUnit}</span>
          </span>
        </p>
        <p className="text-xs text-white/70">
          Chuva: {precipitationProbability === undefined || !Number.isFinite(precipitationProbability) ? '—' : `${precipitationProbability}%`}
        </p>
      </div>
    </article>
  );
}

export default ForecastCard;

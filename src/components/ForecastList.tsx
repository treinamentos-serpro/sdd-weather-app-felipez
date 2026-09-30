import type { ForecastDay, Unit } from '../types/weather';
import ForecastCard from './ForecastCard';

interface ForecastListProps {
  forecast: ForecastDay[];
  unit: Unit;
}

function ForecastList({ forecast, unit }: ForecastListProps) {
  return (
    <section aria-labelledby="forecast-title" className="w-full">
      <h2 id="forecast-title" className="mb-4 text-xl font-semibold text-white">
        Previsão para 5 dias
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {forecast.slice(0, 5).map((day) => (
          <ForecastCard key={day.date} day={day} unit={unit} />
        ))}
      </div>
    </section>
  );
}

export default ForecastList;

export interface WeatherCondition {
  label: string;
  icon: string;
}

const conditions: Record<number, WeatherCondition> = {
  0: { label: 'Céu limpo', icon: '☀️' },
  1: { label: 'Predominantemente limpo', icon: '🌤️' },
  2: { label: 'Parcialmente nublado', icon: '⛅' },
  3: { label: 'Nublado', icon: '☁️' },
  45: { label: 'Neblina', icon: '🌫️' },
  48: { label: 'Neblina congelante', icon: '🌫️' },
  51: { label: 'Garoa leve', icon: '🌦️' },
  61: { label: 'Chuva leve', icon: '🌧️' },
  63: { label: 'Chuva moderada', icon: '🌧️' },
  65: { label: 'Chuva forte', icon: '🌧️' },
  71: { label: 'Neve leve', icon: '🌨️' },
  80: { label: 'Pancadas de chuva', icon: '🌦️' },
  95: { label: 'Trovoada', icon: '⛈️' },
};

export function getWeatherCondition(weatherCode: number): WeatherCondition {
  return conditions[weatherCode] ?? { label: 'Condição desconhecida', icon: '🌡️' };
}

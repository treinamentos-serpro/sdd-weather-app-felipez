import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../../src/App';
import { mockWeatherData } from '../../src/types/weather';

const hookMocks = vi.hoisted(() => ({
  useWeather: vi.fn(),
}));

vi.mock('../../src/hooks/useWeather', () => ({
  useWeather: hookMocks.useWeather,
}));

const baseHookState = {
  status: 'idle' as const,
  data: null,
  cities: [],
  error: null,
  query: '',
  search: vi.fn(),
  selectCity: vi.fn(),
  retry: vi.fn(),
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    hookMocks.useWeather.mockReturnValue(baseHookState);
  });

  it('renders the header and idle state', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: 'Clima Agora' })).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Unidade de temperatura' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pronto para consultar o clima' })).toBeInTheDocument();
  });

  it('focuses the main content after loading completes', () => {
    hookMocks.useWeather.mockReturnValue({ ...baseHookState, status: 'loading' });
    const { rerender } = render(<App />);
    const main = document.getElementById('main-content');

    expect(main).toHaveAttribute('aria-busy', 'true');

    hookMocks.useWeather.mockReturnValue({ ...baseHookState, status: 'empty' });
    rerender(<App />);

    expect(main).toHaveFocus();
    expect(main).toHaveAttribute('aria-busy', 'false');
  });

  it.each([
    ['loading', 'status'],
    ['empty', 'heading'],
  ] as const)('renders the %s state from useWeather', (status, role) => {
    hookMocks.useWeather.mockReturnValue({ ...baseHookState, status });
    render(<App />);

    expect(screen.getByRole(role)).toBeInTheDocument();
  });

  it('renders the error state and delegates retry to useWeather', () => {
    hookMocks.useWeather.mockReturnValue({
      ...baseHookState,
      status: 'error',
      error: new Error('Falha de rede.'),
    });
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Falha de rede.');
    expect(baseHookState.retry).toHaveBeenCalledOnce();
  });

  it('passes successful weather data to presentation components', () => {
    hookMocks.useWeather.mockReturnValue({
      ...baseHookState,
      status: 'success',
      data: mockWeatherData,
    });
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Sao Paulo' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Previsão para 5 dias' })).toBeInTheDocument();
  });

  it('keeps unit in the UI and updates presentation without a new search', () => {
    hookMocks.useWeather.mockReturnValue({
      ...baseHookState,
      status: 'success',
      data: mockWeatherData,
    });
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: '°F' }));

    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '°F' })).toHaveAttribute('aria-pressed', 'true');
    expect(baseHookState.search).not.toHaveBeenCalled();
  });

  it('passes searches to useWeather', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Cidade'), { target: { value: 'Curitiba' } });
    fireEvent.submit(screen.getByRole('search'));

    expect(baseHookState.search).toHaveBeenCalledWith('Curitiba');
  });
});
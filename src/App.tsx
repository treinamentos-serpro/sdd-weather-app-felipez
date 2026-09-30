import { useEffect, useRef, useState } from 'react';

import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';
import EmptyState from './components/states/EmptyState';
import ErrorState from './components/states/ErrorState';
import LoadingState from './components/states/LoadingState';
import { useWeather } from './hooks/useWeather';
import type { Unit } from './types/weather';

function App() {
  const [unit, setUnit] = useState<Unit>('celsius');
  const { status, data, error, search, retry } = useWeather();
  const mainRef = useRef<HTMLElement>(null);
  const previousStatusRef = useRef(status);

  useEffect(() => {
    if (previousStatusRef.current === 'loading' && status !== 'loading') {
      mainRef.current?.focus({ preventScroll: true });
    }

    previousStatusRef.current = status;
  }, [status]);

  function renderContent() {
    switch (status) {
      case 'loading':
        return <LoadingState />;
      case 'empty':
        return <EmptyState />;
      case 'error':
        return <ErrorState message={error?.message} onRetry={retry} />;
      case 'success':
        return data ? (
          <div className="space-y-6">
            <CurrentWeather city={data.city} current={data.current} unit={unit} />
            <ForecastList forecast={data.forecast} unit={unit} />
          </div>
        ) : null;
      case 'idle':
        return (
          <section className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white backdrop-blur-md">
            <h2 className="text-xl font-semibold">Pronto para consultar o clima</h2>
            <p className="mt-2 text-sm text-white/70">Encontre uma cidade para ver a previsão.</p>
          </section>
        );
    }
  }

  return (
    <div className="min-h-screen bg-night-900 text-white">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-accent-500 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
      >
        Pular para o conteúdo
      </a>
      <header className="border-b border-white/10 bg-night-800/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center">
          <a href="/" className="shrink-0 text-xl font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400">
            Clima Agora
          </a>
          <div className="min-w-0 flex-1">
            <SearchBar onSearch={search} disabled={status === 'loading'} />
          </div>
          <UnitToggle unit={unit} onChange={setUnit} />
        </div>
      </header>

      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        aria-busy={status === 'loading'}
        className="mx-auto w-full max-w-6xl px-4 py-8 outline-none sm:px-6 lg:py-12"
      >
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
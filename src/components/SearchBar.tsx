import { type FormEvent, useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  disabled: boolean;
}

function SearchBar({ onSearch, disabled }: SearchBarProps) {
  const [city, setCity] = useState('');
  const [hasValidationError, setHasValidationError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (disabled) {
      return;
    }

    const normalizedCity = city.trim();
    if (!normalizedCity) {
      setHasValidationError(true);
      return;
    }

    setHasValidationError(false);
    onSearch(normalizedCity);
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:flex-row"
    >
      <div className="flex-1">
        <label htmlFor="city-search" className="sr-only">
          Cidade
        </label>
        <input
          id="city-search"
          name="city"
          type="search"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
            if (event.target.value.trim()) {
              setHasValidationError(false);
            }
          }}
          placeholder="Digite uma cidade"
          disabled={disabled}
          aria-invalid={hasValidationError}
          aria-describedby={hasValidationError ? 'city-search-error' : undefined}
          className="w-full rounded-lg border border-white/10 bg-night-800 px-4 py-3 text-white outline-none placeholder:text-white/70 focus-visible:border-accent-400 focus-visible:ring-2 focus-visible:ring-accent-400/40 disabled:cursor-not-allowed disabled:opacity-60"
        />
        {hasValidationError && (
          <p id="city-search-error" role="alert" className="mt-2 text-sm text-white/90">
            Informe uma cidade para iniciar a busca.
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="rounded-lg bg-accent-500 px-5 py-3 font-medium text-white transition hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;

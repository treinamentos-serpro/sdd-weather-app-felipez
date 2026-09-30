import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SearchBar from '../../src/components/SearchBar';

describe('SearchBar', () => {
  it('submits the trimmed city name', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} disabled={false} />);

    await user.type(screen.getByLabelText('Cidade'), '  Sao Paulo  ');
    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(onSearch).toHaveBeenCalledOnce();
    expect(onSearch).toHaveBeenCalledWith('Sao Paulo');
  });

  it('does not submit an empty city', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} disabled={false} />);

    await user.type(screen.getByLabelText('Cidade'), '   ');
    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(onSearch).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent('Informe uma cidade');
    expect(screen.getByLabelText('Cidade')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not submit an empty input', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} disabled={false} />);

    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(onSearch).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent('Informe uma cidade');
  });

  it('submits names with special characters', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} disabled={false} />);

    await user.type(screen.getByLabelText('Cidade'), 'São Paulo');
    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(onSearch).toHaveBeenCalledWith('São Paulo');
  });

  it('disables the search controls when disabled', () => {
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} disabled />);

    expect(screen.getByLabelText('Cidade')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeDisabled();
  });

  it('exposes the search form and accessible label', () => {
    render(<SearchBar onSearch={vi.fn()} disabled={false} />);

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByLabelText('Cidade')).toBeInTheDocument();
  });
});

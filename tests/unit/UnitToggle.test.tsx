import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import UnitToggle from '../../src/components/UnitToggle';

describe('UnitToggle', () => {
  it('exposes the active unit through aria-pressed', () => {
    render(<UnitToggle unit="celsius" onChange={vi.fn()} />);

    const group = screen.getByRole('group', {
      name: 'Unidade de temperatura',
    });
    const celsius = screen.getByRole('button', { name: '°C' });
    const fahrenheit = screen.getByRole('button', { name: '°F' });

    expect(group).toBeInTheDocument();
    expect(celsius).toHaveAttribute('aria-pressed', 'true');
    expect(fahrenheit).toHaveAttribute('aria-pressed', 'false');
  });

  it('notifies the selected unit when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<UnitToggle unit="celsius" onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: '°F' }));

    expect(onChange).toHaveBeenCalledWith('fahrenheit');
  });

  it('supports keyboard activation', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<UnitToggle unit="fahrenheit" onChange={onChange} />);

    await user.tab();
    await user.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith('celsius');
  });
});

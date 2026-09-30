import { describe, expect, it } from 'vitest';

import { formatDay, getShortDate } from '../../src/lib/format';

describe('format helpers', () => {
  it('labels the first two forecast positions', () => {
    expect(formatDay(0, '2026-09-30')).toBe('Hoje');
    expect(formatDay(1, '2026-10-01')).toBe('Amanhã');
  });

  it('uses the weekday for later forecast positions', () => {
    expect(formatDay(2, '2026-10-02')).toBe('sexta-feira');
  });

  it('formats a date as day and month', () => {
    expect(getShortDate('2026-09-30')).toBe('30/09');
  });
});
function parseDate(date: string): Date {
  return new Date(`${date}T12:00:00Z`);
}

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}

export function getShortDate(date: string): string {
  const parsedDate = parseDate(date);
  if (!isValidDate(parsedDate)) {
    return '—';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'UTC',
  }).format(parsedDate);
}

export function formatDay(index: number, date: string): string {
  if (index === 0) {
    return 'Hoje';
  }

  if (index === 1) {
    return 'Amanhã';
  }

  const parsedDate = parseDate(date);
  if (!isValidDate(parsedDate)) {
    return '—';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
    weekday: 'long',
  }).format(parsedDate);
}

export function formatDayLabel(date: string): string {
  const parsedDate = parseDate(date);
  if (!isValidDate(parsedDate)) {
    return '—';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
    weekday: 'short',
  }).format(parsedDate);
}

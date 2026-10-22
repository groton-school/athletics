import { DateTime } from 'luxon';

export function toISODateTime(date: string, time?: string) {
  const iso = DateTime.fromISO(
    `${date}${time ? `T${time}` : ''}`,
    time ? { zone: 'America/New_York' } : undefined
  ).toISO();
  if (!iso) {
    throw new Error(`Could not parse ${date} ${time} as ISO date`);
  }
  return iso;
}

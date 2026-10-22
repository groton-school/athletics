import { DateTime } from 'luxon';

export function currentAcademicYear() {
  const now = DateTime.now();
  return {
    start: DateTime.fromISO(`${now.year - (now.month > 6 ? 0 : 1)}-07-01`),
    end: DateTime.fromISO(`${now.year + (now.month <= 6 ? 0 : 1)}-06-30`)
  };
}

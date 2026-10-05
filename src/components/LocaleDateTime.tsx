'use client';

type Properties = { date: string; time?: string };

export function LocaleDateTime({ date, time }: Properties) {
  return (
    <>
      {new Date(`${date} ${time || ''}`).toLocaleString('en-us', {
        month: 'short',
        weekday: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      })}
    </>
  );
}

'use client';

type ComponentProps = { date: string; time?: string };

export function LocaleDateTime({ date, time }: ComponentProps) {
  return (
    <>
      {new Date(`${date} ${time || ''}`)
        .toLocaleString('en-us', {
          month: 'short',
          weekday: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        })
        .replaceAll(/\s/g, ' ')}
    </>
  );
}

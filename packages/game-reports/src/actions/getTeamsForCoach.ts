'use server';

import { Veracross } from '@/lib/Veracross';
import { cacheLife } from 'next/cache';

export type Teams = Veracross.Data.Athletics.Coaches.TeamCoachCollection;

export async function getTeamsForCoach(coach_id: string) {
  'use cache';
  cacheLife('hours');

  const school_year =
    new Date().getMonth() < 6
      ? new Date().getFullYear() - 1
      : new Date().getFullYear();

  return await Promise.all(
    await Veracross.Data.Athletics.Coaches.list({
      query: {
        coach_id: parseInt(coach_id),
        school_year,
        // @ts-expect-error 2322
        role: '10,11'
      }
    })
  );
}

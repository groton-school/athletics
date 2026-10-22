'use server';

import { Veracross } from '@/lib/Veracross';

export async function getEvent(event_id: number) {
  return await Veracross.Data.Events.Athletics.read({ event_id });
}

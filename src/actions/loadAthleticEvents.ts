'use server';

import { Veracross } from '@/lib/Veracross';
import z from 'zod';

const schema = z.coerce.number().int().gt(0);

export async function loadAthleticEvents(
  internal_team_id: z.input<typeof schema>
) {
  const validated = schema.safeParse(internal_team_id);
  if (validated.success) {
    const [team, events] = await Promise.all([
      await Veracross.Data.Athletics.Teams.read({ id: validated.data }),
      (
        await Promise.all(
          (
            await Veracross.Data.Events.Athletics.list({
              query: { internal_class_id: validated.data }
            })
          ).map(async (event) => ({
            ...event,
            opponents: await Veracross.Data.Events.AthleticsOpponents.list({
              query: { event_id: event.id }
            })
          }))
        )
      ).sort((a, b) => (a.start_date > b.start_date ? 1 : -1))
    ]);
    return { team, events };
  }
  throw new Error('Unusable internal_team_id', { cause: validated.error });
}

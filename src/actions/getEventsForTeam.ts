'use server';

import { Veracross } from '@/lib/Veracross';

export async function getEventsForTeam(internal_team_id: string) {
  const [team, events] = await Promise.all([
    await Veracross.Data.Athletics.Teams.read({
      id: parseInt(internal_team_id)
    }),
    (
      await Promise.all(
        await Veracross.Data.Events.Athletics.list({
          query: { internal_class_id: parseInt(internal_team_id) }
        })
      )
    ).sort((a, b) => (a.start_date > b.start_date ? 1 : -1))
  ]);
  return { team, events };
}

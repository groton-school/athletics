'use server';

import { Veracross } from '@/lib/Veracross';
import { DateTime } from 'luxon';

type Options = {
  start?: DateTime;
  end?: DateTime;
};

export async function getAthleticEvents({ start, end }: Options) {
  const events = await Veracross.Data.Events.Athletics.list({
    query: {
      on_or_after_start_date: start?.toISODate() || undefined,
      on_or_before_end_date: end?.toISODate() || undefined,
      // @ts-expect-error 2322 too restrictive OpenAPI spec
      event_type: '17,19,21,22'
    }
  });
  return await Promise.all(
    events.map(async (event) => ({
      ...event,
      opponents:
        event.event_type_id === 21 || event.event_type_id === 22
          ? await Veracross.Data.Events.AthleticsOpponents.list({
              query: { event_id: event.id }
            })
          : [
              {
                event_id: event.id,
                opponent: event.athletic_opponent,
                score: event.game_score_opponent,
                overtime: event.overtime
              }
            ]
    }))
  );
}

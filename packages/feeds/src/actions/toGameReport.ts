'use server';

import { Veracross } from '@/lib/Veracross';

interface GameReport {
  readonly event: Veracross.Data.Events.Athletics.Athletics;
  title: string;
  outcome?: string;
  summary?: string;
}

// TODO Track & Field _does_ use decimal points for scores
// Issue URL: https://github.com/groton-school/veracross-athletic-feeds/issues/3
export async function toGameReport(
  event: Veracross.Data.Events.Athletics.Athletics
): Promise<GameReport> {
  let opponents:
    | Veracross.Data.Events.AthleticsOpponents.AthleticsOpponentCollection
    | undefined = undefined;
  if (event.event_type_id === 21 || event.event_type_id === 22) {
    opponents = await Veracross.Data.Events.AthleticsOpponents.list({
      query: { event_id: event.id }
    });
  }
  return {
    event,
    title: `${
      event.description && !/^[A-Z0-9\-]+:/.test(event.description)
        ? `${event.description}: `
        : ''
    }${event.team_description.replace(/^([^:]+: )(.*)$/, '$2')} ${
      event.home_away_id === 1
        ? 'vs.'
        : event.destination_organization === event.athletic_opponent
          ? '@'
          : 'vs.'
    } ${
      opponents
        ?.map((o) => o.opponent)
        .join(', ')
        .replace(/, ([^,]+)$/, ' & $1') || event.athletic_opponent
    }${event.event_type_id === 21 ? ' (Scrimmage)' : ''}`,
    outcome: `${
      event.game_score_us !== null
        ? `${[
            event.game_score_us,
            ...(opponents?.map((o) => o.score) || [event.game_score_opponent])
          ].join(' - ')}${
            event.overtime ||
            opponents?.reduce((ot, o) => ot || o.overtime, false)
              ? ' OT'
              : ''
          }`
        : ''
    }`,
    summary: event.summary
  };
}

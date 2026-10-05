import { Properties } from './Properties';

export function View({ event }: Properties) {
  return (
    <div>
      {event.description}
      {event.game_outcome_id ? (
        <div className="float-end">
          {`${event.game_score_us} - ${event.game_score_opponent} ${event.game_outcome_description}`}{' '}
        </div>
      ) : (
        <></>
      )}
      {event.summary ? <div>{event.summary}</div> : <></>}
    </div>
  );
}

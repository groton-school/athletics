import { ComponentProps } from './ComponentProps';

export function View({ report }: ComponentProps) {
  return (
    <>
      <strong>{report.title}</strong>
      {report.outcome ? (
        <div className="float-end">
          {`${report.outcome} ${report.event.game_outcome_description}`.replaceAll(
            /\s/g,
            ' '
          )}
        </div>
      ) : (
        <></>
      )}
      {report.summary ? (
        <div className="mt-2 mb-4">{report.summary}</div>
      ) : (
        <></>
      )}
    </>
  );
}

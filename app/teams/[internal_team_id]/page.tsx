import { loadAthleticEvents } from '#actions/loadAthleticEvents';
import { Event } from '#components/Event';
import { Loading } from '#components/Loading';
import { LocaleDateTime } from '#components/LocaleDateTime';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { Container, Table } from 'react-bootstrap';

type PathParameters = { internal_team_id: string };
type Properties = { params: Promise<PathParameters> };

export default function Page(props: Properties) {
  return (
    <Suspense fallback={<Loading caption="Loading competition…" />}>
      <DynamicContent {...props} />
    </Suspense>
  );
}

async function DynamicContent({ params }: Properties) {
  await connection();

  const { team, events } = await loadAthleticEvents(
    (await params).internal_team_id
  );

  return (
    <Container>
      <h1>{team.description}</h1>
      <Table striped hover>
        <tbody>
          {events.map((event) => (
            <tr>
              <td>
                <LocaleDateTime
                  date={event.start_date}
                  time={event.start_time}
                />
              </td>
              <td>
                <Event event={event} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

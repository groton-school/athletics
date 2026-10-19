import { Report } from '@/actions/getReport';
import { Button, Image, Table } from 'react-bootstrap';
import { LocaleDateTime } from '../LocaleDateTime';
import { Report as View } from './Report';

type ComponentProps = {
  reports: Report[];
  internal_team_id: string;
};

export async function Collection({
  reports,
  internal_team_id
}: ComponentProps) {
  return (
    <Table striped hover>
      <tbody>
        {reports.length ? (
          <>
            {reports.map((report) => (
              <tr key={`${report.event.internal_team_id}.${report.event.id}`}>
                <td>
                  <LocaleDateTime
                    date={report.event.start_date}
                    time={report.event.start_time}
                  />
                </td>
                <td>
                  <View report={report} />
                </td>
              </tr>
            ))}
            <tr>
              <td />
              <td>
                {' '}
                <Button
                  target="Axiom"
                  href={`https://axiom.veracross.com/groton/#/detail/team/${internal_team_id}/-561-all-events`}
                  variant="light"
                >
                  <Image
                    className="me-3"
                    src="/assets/veracross.svg"
                    style={{ height: '1em' }}
                  />
                  Edit schedule in Axiom
                </Button>
              </td>
            </tr>
          </>
        ) : (
          <tr>
            <td>
              No events scheduled
              <Button
                className="ms-3"
                target="Axiom"
                href={`https://axiom.veracross.com/groton/#/detail/team/${internal_team_id}/-561-all-events`}
                variant="light"
              >
                <Image
                  className="me-3"
                  src="/assets/veracross.svg"
                  style={{ height: '1em' }}
                />
                Edit in Axiom
              </Button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

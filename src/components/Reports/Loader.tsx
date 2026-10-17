import { getEventsForTeam } from '@/actions/getEventsForTeam';
import { getReport } from '@/actions/getReport';
import { connection } from 'next/server';
import { Collection } from './Collection';

export async function Loader({
  params
}: {
  params: PageProps<'/coaches/[coach_id]/teams/[internal_team_id]'>['params'];
}) {
  await connection();

  const { internal_team_id } = await params;
  const { events } = await getEventsForTeam(internal_team_id);
  const reports = await Promise.all(events.map(getReport));

  return <Collection reports={reports} internal_team_id={internal_team_id} />;
}

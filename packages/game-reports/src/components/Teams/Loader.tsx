import { getTeamsForCoach } from '@/actions/getTeamsForCoach';
import { connection } from 'next/server';
import { Picker } from './Picker';

export async function Loader({
  params
}: {
  params: Promise<{ coach_id: string; internal_team_id?: string }>;
}) {
  await connection();

  const { coach_id, internal_team_id } = await params;
  const teams = await getTeamsForCoach(coach_id);

  return <Picker coach_id={coach_id} teams={teams} active={internal_team_id} />;
}

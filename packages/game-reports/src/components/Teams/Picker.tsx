import { Teams } from '@/actions/getTeamsForCoach';
import Link from 'next/link';

type ComponentProps = {
  coach_id: string;
  teams: Teams;
  active?: string;
};

export function Picker({ coach_id, teams, active }: ComponentProps) {
  const selected = parseInt(active || '-1');
  return (
    <ul className="nav nav-tabs" role="tablist">
      {teams.map((team) => (
        <li
          className="nav-item"
          role="presentation"
          key={team.internal_team_id}
        >
          <Link
            className={`nav-link${selected == team.internal_team_id ? ' active' : ''}`}
            href={`/coaches/${coach_id}/teams/${team.internal_team_id}`}
            role="tab"
            type="button"
            aria-selected={selected == team.internal_team_id ? 'true' : 'false'}
          >
            {team.team_description}
          </Link>
        </li>
      ))}
    </ul>
  );
}

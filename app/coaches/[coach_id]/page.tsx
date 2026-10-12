import { Loading } from '@/components/Loading';
import { Veracross } from '@/lib/Veracross';
import Link from 'next/link';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { Container } from 'react-bootstrap';

type PathParameters = { coach_id: string };
type Properties = { params: Promise<PathParameters> };

export default function Page(props: Properties) {
  return (
    <Suspense fallback={<Loading caption="Loading teams…" />}>
      <DynamicContent {...props} />
    </Suspense>
  );
}

async function DynamicContent({ params }: Properties) {
  await connection();

  const school_year =
    new Date().getMonth() < 6
      ? new Date().getFullYear() - 1
      : new Date().getFullYear();

  const coach_id = parseInt((await params).coach_id);

  const teams = await Promise.all(
    await Veracross.Data.Athletics.Coaches.list({
      query: { coach_id, school_year }
    })
  );

  return (
    <Container>
      <ul>
        {teams.map((team) => (
          <li>
            <Link href={{ pathname: `/teams/${team.internal_team_id}` }}>
              {team.team_description}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

import * as Reports from '@/components/Reports';
import * as Teams from '@/components/Teams';
import { Suspense } from 'react';
import { TabContent } from 'react-bootstrap';

export default function Page(
  props: PageProps<'/coaches/[coach_id]/teams/[internal_team_id]'>
) {
  return (
    <>
      <Suspense fallback={<Teams.Skeleton />}>
        <Teams.Loader {...props} />
      </Suspense>
      <TabContent>
        <Suspense fallback={<Reports.Skeleton />}>
          <Reports.Loader {...props} />
        </Suspense>
      </TabContent>
    </>
  );
}

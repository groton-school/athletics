import { Centered } from '@/components/Centered';
import * as Teams from '@/components/Teams';
import { Suspense } from 'react';
import { Image, TabContent } from 'react-bootstrap';

export default function Page(props: PageProps<'/coaches/[coach_id]'>) {
  return (
    <>
      <Suspense fallback={<Teams.Skeleton />}>
        <Teams.Loader {...props} />
      </Suspense>
      <TabContent>
        <Centered>
          <Image
            src="/assets/Groton_zebra_type_2c.png"
            style={{ height: '20vh' }}
          />
        </Centered>
      </TabContent>
    </>
  );
}

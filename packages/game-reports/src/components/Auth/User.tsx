import { auth } from '@/lib/auth';
import { Badge, Image } from 'react-bootstrap';
import { Person } from 'react-bootstrap-icons';

export async function User() {
  const session = await auth();
  return (
    <Badge bg="light" text="black" pill className="fw-normal">
      {session?.user?.image ? (
        <Image
          src={session.user.image}
          roundedCircle
          style={{ height: '2em' }}
          className="me-2"
        />
      ) : (
        <Person className="me-2" />
      )}
      {session?.user?.name || 'Groton Zebra'}
    </Badge>
  );
}

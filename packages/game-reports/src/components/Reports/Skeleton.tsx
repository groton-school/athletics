import { Spinner, Table } from 'react-bootstrap';
import { Centered } from '../Centered';

export function Skeleton() {
  return (
    <Centered>
      <Spinner style={{ height: '20vh', width: '20vh' }} />
    </Centered>
  );
}

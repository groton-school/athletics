import { Spinner } from 'react-bootstrap';

export function Skeleton() {
  return (
    <ul className="nav nav-tabs" role="tablist">
      <li className="nav-item" role="presentation">
        <a className="nav-link" role="tab" type="button" aria-selected="true">
          Loading <Spinner style={{ height: '1em', width: '1em' }} />
        </a>
      </li>
    </ul>
  );
}

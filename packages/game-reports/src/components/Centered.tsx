import { PropsWithChildren } from 'react';

export function Centered({ children }: PropsWithChildren) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: 'calc(100vh - 58px)' }}
    >
      {children}
    </div>
  );
}

'use client';

import { getReport } from '@/actions/getReport';
import { updateReport } from '@/actions/updateReport';
import { useActionState, useState } from 'react';
import { Button, Form, Image, Spinner } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import { ComponentProps } from './ComponentProps';
import { Edit } from './Edit';
import { View } from './View';

export function Report({ report }: ComponentProps) {
  const [value, setValue] = useState(report);
  const [editing, setEditing] = useState(false);
  const [state, action, pending] = useActionState(
    async (state: unknown, form: FormData) => {
      setEditing(false);
      updateReport(report, state, form).then(() => {
        getReport(report.event).then(setValue);
      });
    },
    null
  );

  return editing ? (
    <Form action={action}>
      <div className="float-end">
        {pending ? <Spinner /> : <></>}
        <Button onClick={() => setEditing(false)} variant="light">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
      <Edit report={value} />
    </Form>
  ) : (
    <div>
      <div className="float-end ps-3">
        {pending ? <Spinner /> : <></>}
        <Button variant="light" onClick={() => setEditing(true)}>
          <Pencil />
        </Button>
        <Button
          className="ms-3"
          target="Axiom"
          href={`https://axiom.veracross.com/groton/#/detail/athletic-event/${report.event.id}`}
          variant="light"
        >
          <Image src="/assets/veracross.svg" style={{ height: '1em' }} />
        </Button>
      </div>
      <View report={value} />
    </div>
  );
}

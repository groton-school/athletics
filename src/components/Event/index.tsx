'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Pencil, X } from 'react-bootstrap-icons';
import { Edit } from './Edit';
import { Properties } from './Properties';
import { View } from './View';

export function Event(props: Properties) {
  const [editing, setEditing] = useState(false);
  const toggle = () => setEditing(!editing);

  return (
    <>
      <Button variant="light" onClick={toggle} className="float-end">
        {editing ? <X /> : <Pencil />}
      </Button>
      {editing === true ? <Edit {...props} /> : <View {...props} />}
    </>
  );
}

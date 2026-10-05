'use client';

import { updateAthleticScore } from '#actions/updateAthleticScore';
import { useActionState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Properties } from './Properties';

export function Edit({ event }: Properties) {
  const [state, action, pending] = useActionState(
    updateAthleticScore.bind(null, event.id),
    null
  );

  return (
    <Form action={action}>
      <div>{event.description}</div>

      <Row>
        <Col>
          <FloatingLabel label="Outcome">
            <Form.Control
              as="select"
              type="number"
              name="game_outcome_id"
              defaultValue={event.game_outcome_id}
              placeholder="Outcome"
            >
              {[
                // TODO collect from API fields response
                [0, ''],
                [1, 'Win'],
                [2, 'Loss'],
                [3, 'Tie'],
                [4, 'Placed'],
                [5, 'N/A']
              ].map(([value, description]) => (
                <option value={value}>{description}</option>
              ))}
            </Form.Control>
          </FloatingLabel>
        </Col>
        <Col>
          <Form.Label>
            <Form.Check
              type="checkbox"
              name="overtime"
              defaultChecked={event.overtime}
              placeholder="Overtime"
            />
            Overtime
          </Form.Label>
        </Col>
        <Col>
          <FloatingLabel label="Placement">
            <Form.Control
              as="select"
              type="number"
              name="placement_id"
              defaultValue={event.placement_id}
              placeholder="Placement"
            >
              {Array.from({ length: 51 }, (_, i) => i).map((i) => (
                <option value={i}>{i !== 0 ? i : ''}</option>
              ))}
            </Form.Control>
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel label="Groton">
            <Form.Control
              type="number"
              name="game_score_us"
              defaultValue={event.game_score_us}
              placeholder="Score"
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label={event.athletic_opponent}>
            <Form.Control
              type="number"
              name="game_score_opponent"
              defaultValue={event.game_score_opponent}
              placeholder="Score"
            />
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel label="Summary">
        <Form.Control
          as="textarea"
          type="text"
          style={{ height: '5em' }}
          name="summary"
          defaultValue={event.summary}
          placeholder="Game report"
        />
      </FloatingLabel>
      <Button type="submit" disabled={pending}>
        Save
      </Button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </Form>
  );
}

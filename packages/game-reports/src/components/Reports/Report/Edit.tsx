'use client';

import { useState } from 'react';
import { Col, FloatingLabel, Form, FormLabel, Row } from 'react-bootstrap';
import { ComponentProps } from './ComponentProps';

export function Edit({ report }: ComponentProps) {
  const [placed, setPlaced] = useState(report.event.placement_id > 0);

  return (
    <>
      <h3>{report.title}</h3>

      <Row>
        <FormLabel>Outome</FormLabel>
        <Col>
          <FloatingLabel label="Outcome">
            <Form.Control
              as="select"
              type="number"
              name="game_outcome_id"
              defaultValue={report.event.game_outcome_id}
              placeholder="Outcome"
              onChange={(e) => setPlaced(e.currentTarget.value === '4')}
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
          <Form.Check
            type="checkbox"
            name="overtime"
            defaultChecked={report.event.overtime}
            label="Overtime"
          />
        </Col>
        {placed ? (
          <Col>
            <FloatingLabel label="Placement">
              <Form.Control
                as="select"
                type="number"
                name="placement_id"
                defaultValue={report.event.placement_id}
                placeholder="Placement"
              >
                {Array.from({ length: 51 }, (_, i) => i).map((i) => (
                  <option value={i}>{i !== 0 ? i : ''}</option>
                ))}
              </Form.Control>
            </FloatingLabel>
          </Col>
        ) : (
          <></>
        )}
      </Row>
      <Row>
        <FormLabel>Scores</FormLabel>
        <Col>
          <FloatingLabel label="Groton">
            <Form.Control
              type="number"
              name="game_score_us"
              defaultValue={report.event.game_score_us}
              placeholder="Score"
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label={report.event.athletic_opponent}>
            <Form.Control
              type="number"
              name="game_score_opponent"
              defaultValue={report.event.game_score_opponent}
              placeholder="Score"
            />
          </FloatingLabel>
        </Col>
      </Row>
      <FormLabel>Summary</FormLabel>
      <FloatingLabel label="Summary">
        <Form.Control
          as="textarea"
          type="text"
          style={{ height: '5em' }}
          name="summary"
          defaultValue={report.event.summary}
          placeholder="Game report"
        />
      </FloatingLabel>
    </>
  );
}

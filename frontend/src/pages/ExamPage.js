import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import Timer from '../components/Timer';

function ExamPage({ exam, onSubmit }) {
  const [answers, setAnswers] = useState(Array(exam.questions?.length || 0).fill(null));
  const [timeUp, setTimeUp] = useState(false);

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit();
  };

  if (timeUp) {
    return <Alert variant="warning">Time is up! Exam submitted automatically.</Alert>;
  }

  return (
    <Container className="mt-5">
      <h2>{exam.title}</h2>
      <Timer duration={exam.timer} onTimeUp={handleTimeUp} />
      {exam.questions?.map((q, idx) => (
        <Card key={idx} className="mb-3">
          <Card.Body>
            <p><strong>Question {idx + 1}:</strong> {q.question}</p>
            {q.options.map((opt, optIdx) => (
              <Form.Check
                key={optIdx}
                type="radio"
                label={opt}
                name={`question-${idx}`}
                checked={answers[idx] === optIdx}
                onChange={() => {
                  const newAnswers = [...answers];
                  newAnswers[idx] = optIdx;
                  setAnswers(newAnswers);
                }}
              />
            ))}
          </Card.Body>
        </Card>
      ))}
      <Button onClick={handleSubmit} variant="success">Submit Exam</Button>
    </Container>
  );
}

export default ExamPage;
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function MCQForm({ onAddQuestion, numOptions = 4 }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(Array(numOptions).fill(''));
  const [correctOption, setCorrectOption] = useState(0);

  const handleAddQuestion = () => {
    if (!question || options.some(opt => !opt)) return;
    onAddQuestion({ question, options, correctOption });
    setQuestion('');
    setOptions(Array(numOptions).fill(''));
    setCorrectOption(0);
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <h4>Add MCQ Question</h4>
        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control value={question} onChange={e => setQuestion(e.target.value)} />
        </Form.Group>
        {options.map((opt, idx) => (
          <Form.Group key={idx} className="mb-3">
            <Form.Label>Option {idx + 1}</Form.Label>
            <Form.Control value={opt} onChange={e => {
              const newOptions = [...options];
              newOptions[idx] = e.target.value;
              setOptions(newOptions);
            }} />
          </Form.Group>
        ))}
        <Form.Group className="mb-3">
          <Form.Label>Correct Option</Form.Label>
          <Form.Select value={correctOption} onChange={e => setCorrectOption(Number(e.target.value))}>
            {options.map((_, idx) => <option key={idx} value={idx}>Option {idx + 1}</option>)}
          </Form.Select>
        </Form.Group>
        <Button onClick={handleAddQuestion} variant="primary">Add Question</Button>
      </Card.Body>
    </Card>
  );
}

export default MCQForm;
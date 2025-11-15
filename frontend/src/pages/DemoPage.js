import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Alert, Form } from 'react-bootstrap';
import MCQForm from '../components/MCQForm';

function DemoPage() {
  const [questions, setQuestions] = useState([]);
  const [examCreated, setExamCreated] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [remark, setRemark] = useState('');

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const createDemoExam = () => {
    if (questions.length === 0) {
      alert('Add at least one question to create the demo exam.');
      return;
    }
    setExamCreated(true);
    setAnswers(new Array(questions.length).fill(null));
  };

  const handleAnswerChange = (optionIdx) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIdx] = optionIdx;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const submitDemo = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctOption) correctCount++;
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(correctCount);
    if (percentage >= 90) setRemark('Excellent');
    else if (percentage >= 70) setRemark('Good');
    else if (percentage >= 50) setRemark('Fair');
    else setRemark('Poor');
    setSubmitted(true);
  };

  return (
    <Container className="mt-5">
      {!examCreated ? (
        <>
          <h2><i className="bi bi-play-circle"></i> Try Demo - Create MCQs as Teacher</h2>
          <Alert variant="info">
            Add all your questions below. Once ready, click "Create Demo Exam" to take it as a student.
          </Alert>
          <MCQForm onAddQuestion={addQuestion} isDemo={true} />
          <div className="mt-4">
            <h4>All Added Questions ({questions.length}):</h4>
            {questions.length > 0 ? (
              questions.map((q, idx) => (
                <Card key={idx} className="mb-3">
                  <Card.Body>
                    <p><strong>Question {idx + 1}:</strong> {q.question}</p>
                    <ul>
                      {q.options.map((opt, optIdx) => (
                        <li key={optIdx}>{opt} {optIdx === q.correctOption ? '(Correct)' : ''}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No questions added yet.</p>
            )}
          </div>
          <Button onClick={createDemoExam} variant="success" size="lg" className="mt-3">
            <i className="bi bi-check-circle"></i> Create Demo Exam
          </Button>
        </>
      ) : !submitted ? (
        <>
          <h2><i className="bi bi-pencil-square"></i> Take Demo Exam</h2>
          <Alert variant="warning">
            Answer the questions one by one. Click "Next" to proceed or "Submit Demo" on the last question.
          </Alert>
          <Card className="mb-3">
            <Card.Body>
              <p><strong>Question {currentQuestionIdx + 1} of {questions.length}:</strong> {questions[currentQuestionIdx].question}</p>
              {questions[currentQuestionIdx].options.map((opt, optIdx) => (
                <Form.Check
                  key={optIdx}
                  type="radio"
                  label={opt}
                  name={`question-${currentQuestionIdx}`}
                  checked={answers[currentQuestionIdx] === optIdx}
                  onChange={() => handleAnswerChange(optIdx)}
                />
              ))}
            </Card.Body>
          </Card>
          <div className="d-flex justify-content-between">
            <Button
              onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
              variant="secondary"
              disabled={currentQuestionIdx === 0}
            >
              <i className="bi bi-arrow-left"></i> Previous
            </Button>
            {currentQuestionIdx < questions.length - 1 ? (
              <Button onClick={nextQuestion} variant="primary">
                <i className="bi bi-arrow-right"></i> Next
              </Button>
            ) : (
              <Button onClick={submitDemo} variant="success">
                <i className="bi bi-send"></i> Submit Demo
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <h2><i className="bi bi-trophy"></i> Demo Results</h2>
          <Alert variant="success">
            <h4>Your Score: {score}/{questions.length}</h4>
            <p>Remark: {remark}</p>
          </Alert>
          {questions.map((q, idx) => (
            <Card key={idx} className="mb-3">
              <Card.Body>
                <p><strong>Question {idx + 1}:</strong> {q.question}</p>
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} className={`p-2 ${optIdx === q.correctOption ? 'bg-success text-white' : answers[idx] === optIdx ? 'bg-danger text-white' : ''}`}>
                    {opt} {optIdx === q.correctOption ? '(Correct)' : answers[idx] === optIdx ? '(Your Answer)' : ''}
                  </div>
                ))}
              </Card.Body>
            </Card>
          ))}
          <Button onClick={() => { setExamCreated(false); setSubmitted(false); setAnswers([]); setCurrentQuestionIdx(0); }} variant="secondary" className="mt-3">
            <i className="bi bi-arrow-left"></i> Back to Add Questions
          </Button>
        </>
      )}
    </Container>
  );
}

export default DemoPage;

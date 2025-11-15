import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import Chat from '../components/Chat';
import Spinner from '../components/Spinner';
import ExamPage from './ExamPage';

function StudentDashboard() {
  const [form, setForm] = useState({ name: '', rollNo: '', code: '' });
  const [exam, setExam] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previousSubmission, setPreviousSubmission] = useState(null);
  const token = localStorage.getItem('token');

  const startExam = async () => {
    setLoading(true);
    setError('');
    setExam(null);
    try {
      const res = await axios.get(`http://localhost:5000/api/exams/${form.code}`);
      setExam(res.data);
    } catch (err) {
      if (err.response && err.response.status === 403 && err.response.data.message === 'Deadline passed') {
        setError('Oops, no questions available. Seems like you have missed the deadline.');
        setExam({}); // Show blank exam page
      } else if (err.response && err.response.status === 404) {
        setError('Exam not found. Please check your exam code.');
      } else {
        setError('Failed to load the exam. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const submitExam = async (answers) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/exams/submit',
        { examId: exam._id, answers, rollNo: form.rollNo, name: form.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setScore(res.data.score);
      setRemark(res.data.remark);
      setSubmitted(true);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        // One attempt logic: Fetch previous submission
        const prevRes = await axios.get(`http://localhost:5000/api/exams/${exam._id}/submissions`, { headers: { Authorization: `Bearer ${token}` } });
        const prev = prevRes.data.find(s => s.rollNo === form.rollNo && s.name === form.name);
        if (prev) {
          setPreviousSubmission(prev);
          setScore(prev.score);
          setRemark(prev.remark);
          setSubmitted(true);
        }
      } else {
        setError('Error submitting exam. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Container className="mt-5">
        <Card className="text-center p-4">
          <h2>Your Score: {score}/{exam.questions?.length || 0}</h2>
          <p className="lead">Remark: {remark}</p>
          <Chat receiverId={exam.teacherId} examId={exam._id} />
          <Button variant="primary" className="mt-3" onClick={() => {
            setSubmitted(false);
            setExam(null);
            setForm({ name: '', rollNo: '', code: '' });
            setScore(0);
            setRemark('');
            setPreviousSubmission(null);
          }}>
            Take Another Exam
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4">Enter Exam Details</h2>

          {error && <Alert variant="danger" style={{ fontWeight: 'bold' }}>{error}</Alert>}

          {loading && <Spinner />}

          {!exam && (
            <>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Roll No</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your roll number"
                    value={form.rollNo}
                    onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Exam Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter exam code"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    startExam();
                  }}
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(90deg, #00d4ff, #6a0dad)',
                    border: 'none',
                    fontWeight: 'bold',
                    width: '100%',
                  }}
                >
                  Start Exam
                </Button>
              </Form>
            </>
          )}

          {exam && <ExamPage exam={exam} onSubmit={submitExam} />}
          {exam && <Chat receiverId={exam.teacherId} examId={exam._id} />}
        </Col>
      </Row>
    </Container>
  );
}

export default StudentDashboard;
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import MCQForm from '../components/MCQForm';
import Chat from '../components/Chat';

function TeacherDashboard() {
  const [exam, setExam] = useState({ title: '', timer: 0, deadline: '', questions: [] });
  const [numQuestions, setNumQuestions] = useState(5);
  const [numOptions, setNumOptions] = useState(4);
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [createdCode, setCreatedCode] = useState('');
  const [error, setError] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatStudentId, setChatStudentId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState({ question: '', options: [], correctOption: 0 });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/exams', { headers: { Authorization: `Bearer ${token}` } });
      setExams(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addQuestion = (question) => {
    if (exam.questions.length < numQuestions) {
      setExam({ ...exam, questions: [...exam.questions, question] });
    }
  };

  const editQuestion = (index) => {
    setEditingIndex(index);
    setEditingQuestion(exam.questions[index]);
    setShowEditModal(true);
  };

  const saveEditedQuestion = () => {
    const newQuestions = [...exam.questions];
    newQuestions[editingIndex] = editingQuestion;
    setExam({ ...exam, questions: newQuestions });
    setShowEditModal(false);
    setEditingQuestion({ question: '', options: [], correctOption: 0 });
  };

  const deleteQuestion = (index) => {
    const newQuestions = exam.questions.filter((_, i) => i !== index);
    setExam({ ...exam, questions: newQuestions });
  };

  const createExam = async () => {
    if (!exam.title || !exam.timer || !exam.deadline || exam.questions.length === 0) {
      setError('All fields and questions are required.');
      return;
    }
    if (numQuestions <= 0 || numOptions <= 1) {
      setError('Number of questions must be at least 1, and options at least 2.');
      return;
    }
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/exams', exam, { headers: { Authorization: `Bearer ${token}` } });
      setCreatedCode(res.data.exam.examCode);
      setExam({ title: '', timer: 0, deadline: '', questions: [] });
      fetchExams();
    } catch (err) {
  console.log("ERROR DETAILS:", err.response?.data || err.message);
  setError(err.response?.data?.message || 'Error creating exam.');
}
  };

  const viewScores = async () => {
    if (!selectedExamId) {
      setError('Select an exam.');
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/exams/${selectedExamId}/submissions`, { headers: { Authorization: `Bearer ${token}` } });
      setSubmissions(res.data);
    } catch (err) {
      setError('Error fetching scores.');
    }
  };

  const startChat = (studentId) => {
    setChatStudentId(studentId);
    setShowChat(true);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <h2>Create Exam</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Exam Title</Form.Label>
              <Form.Control value={exam.title} onChange={e => setExam({ ...exam, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time in Minutes</Form.Label>
              <Form.Control type="number" value={exam.timer} onChange={e => setExam({ ...exam, timer: Number(e.target.value) })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control type="datetime-local" value={exam.deadline} onChange={e => setExam({ ...exam, deadline: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of Questions</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={numQuestions}
                onChange={e => setNumQuestions(Number(e.target.value) || 1)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Options per Question</Form.Label>
              <Form.Control
                type="number"
                min="2"
                value={numOptions}
                onChange={e => setNumOptions(Number(e.target.value) || 2)}
              />
            </Form.Group>
          </Form>
          <MCQForm onAddQuestion={addQuestion} numOptions={numOptions} />
          <div className="mt-4">
            <h4>Added Questions ({exam.questions.length}/{numQuestions})</h4>
            {exam.questions.map((q, idx) => (
              <Card key={idx} className="mb-3">
                <Card.Body>
                  <p><strong>Q{idx + 1}:</strong> {q.question}</p>
                  <ul>
                    {q.options.map((opt, optIdx) => (
                      <li key={optIdx}>{opt} {optIdx === q.correctOption ? '(Correct)' : ''}</li>
                    ))}
                  </ul>
                  <Button variant="warning" size="sm" onClick={() => editQuestion(idx)}>Edit</Button>
                  <Button variant="danger" size="sm" className="ms-2" onClick={() => deleteQuestion(idx)}>Delete</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
          <Button onClick={createExam} variant="success" className="mt-3">Create Exam</Button>
          {createdCode && (
  <Alert variant="success" className="mt-3 text-center">
    <h5>✅ Exam Created Successfully!</h5>
    <p>
      <strong>Exam Code:</strong>{' '}
      <span style={{ fontFamily: 'monospace', fontSize: '1.2rem' }}>{createdCode}</span>
      <Button
        variant="outline-dark"
        size="sm"
        className="ms-2"
        onClick={() => navigator.clipboard.writeText(createdCode)}
      >
        Copy
      </Button>
    </p>
  </Alert>
)}
        </Col>
        <Col md={4}>
          <h3>View Scores</h3>
          <Form.Group>
            <Form.Label>Select Exam</Form.Label>
            <Form.Select onChange={e => setSelectedExamId(e.target.value)} value={selectedExamId}>
              <option value="">Choose...</option>
              {exams.map(e => <option key={e._id} value={e._id}>{e.title}</option>)}
            </Form.Select>
          </Form.Group>
          <Button onClick={viewScores} variant="primary" className="mt-2">View Scores</Button>
          <ListGroup className="mt-3">
            {submissions.map(sub => (
              <ListGroup.Item key={sub._id} className="d-flex justify-content-between align-items-center">
                <div>
                  {sub.name} (Roll: {sub.rollNo}) - Score: {sub.score} ({sub.remark})
                </div>
                <Button variant="link" onClick={() => startChat(sub.studentId?._id)} size="sm">
                  <i className="bi bi-chat"></i> Start Chat
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      {/* Edit Question Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                value={editingQuestion.question}
                onChange={e => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
              />
            </Form.Group>
            {editingQuestion.options.map((opt, idx) => (
              <Form.Group key={idx} className="mb-3">
                <Form.Label>Option {idx + 1}</Form.Label>
                <Form.Control
                  value={opt}
                  onChange={e => {
                    const newOptions = [...editingQuestion.options];
                    newOptions[idx] = e.target.value;
                    setEditingQuestion({ ...editingQuestion, options: newOptions });
                  }}
                />
              </Form.Group>
            ))}
            <Form.Group className="mb-3">
              <Form.Label>Correct Option</Form.Label>
              <Form.Select
                value={editingQuestion.correctOption}
                onChange={e => setEditingQuestion({ ...editingQuestion, correctOption: Number(e.target.value) })}
              >
                {editingQuestion.options.map((_, idx) => (
                  <option key={idx} value={idx}>Option {idx + 1}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={saveEditedQuestion}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showChat} onHide={() => setShowChat(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chat with Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Chat receiverId={chatStudentId} examId={selectedExamId} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default TeacherDashboard;
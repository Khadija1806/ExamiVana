const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const auth = require('../middleware/auth');

router.post('/', auth, examController.createExam);
router.get('/', auth, examController.getExams);
router.get('/:code', examController.getExamByCode);
router.post('/submit', auth, examController.submitExam);
router.get('/:examId/submissions', auth, examController.getSubmissions);

module.exports = router;
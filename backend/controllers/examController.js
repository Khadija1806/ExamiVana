const Exam = require('../models/Exam');
const Submission = require('../models/Submission');
const crypto = require('crypto');

// Helper: generate a unique exam code
const generateUniqueExamCode = async () => {
  let code;
  let attempts = 0;

  do {
    code = 'EXAM-' + crypto.randomBytes(3).toString('hex').toUpperCase(); // EXAM-A1B2C3
    attempts++;
    if (attempts > 10) throw new Error('Cannot generate unique exam code.');
  } while (await Exam.findOne({ examCode: code }));

  return code;
};

// CREATE EXAM
exports.createExam = async (req, res) => {
  try {
    const { title, timer, deadline, questions } = req.body;
    const teacherId = req.user?.id;

    if (!title || !timer || !deadline || !questions || questions.length === 0) {
      return res.status(400).json({ message: "All fields and at least one question are required." });
    }

    const exam = new Exam({ title, timer, deadline, questions, teacherId });
    await exam.save();

    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ message: "Error creating exam", error: error.message });
  }
};

// GET ALL EXAMS (teacher)
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ teacherId: req.user.id }).sort({ createdAt: -1 });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET EXAM BY CODE (student)
exports.getExamByCode = async (req, res) => {
  try {
    const exam = await Exam.findOne({ examCode: req.params.code });
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    if (new Date() > new Date(exam.deadline)) {
      return res.status(403).json({ message: "Deadline has passed" });
    }
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SUBMIT EXAM
exports.submitExam = async (req, res) => {
  try {
    const { examId, answers, rollNo, name } = req.body;
    const studentId = req.user?.id;

    if (!examId || !answers || !rollNo || !name) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    const existing = await Submission.findOne({ examId, rollNo, name });
    if (existing) return res.status(409).json({ message: "Already submitted." });

    let score = 0;
    answers.forEach((ans, idx) => {
      if (ans === exam.questions[idx].correctOption) score++;
    });

    const percentage = (score / exam.questions.length) * 100;
    let remark = "Poor";
    if (percentage >= 90) remark = "Excellent";
    else if (percentage >= 70) remark = "Good";
    else if (percentage >= 50) remark = "Fair";

    const submission = new Submission({ examId, studentId, answers, score, remark, rollNo, name });
    await submission.save();

    res.json({ score, remark });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SUBMISSIONS FOR EXAM (teacher)
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ examId: req.params.examId })
      .populate('studentId', 'name rollNo')
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

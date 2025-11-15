const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [Number],
  score: { type: Number, default: 0 },
  remark: { type: String, default: '' },
  rollNo: { type: String, required: true },
  name: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
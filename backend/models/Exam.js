const mongoose = require('mongoose');

// Sub-schema for questions
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: Number, required: true },
});

// Main exam schema
const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  timer: { type: Number, required: true },
  deadline: { type: Date, required: true },
  questions: { type: [questionSchema], required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  examCode: { type: String, unique: true, sparse: true }, // ✅ unique code
});

// Auto-generate unique exam code before saving
examSchema.pre('save', async function(next) {
  if (!this.examCode) {
    const crypto = require('crypto');
    let code;
    let exists = true;
    while (exists) {
      code = 'EXAM-' + crypto.randomBytes(3).toString('hex').toUpperCase();
      exists = await mongoose.models.Exam.findOne({ examCode: code });
    }
    this.examCode = code;
  }
  next();
});

module.exports = mongoose.model('Exam', examSchema);

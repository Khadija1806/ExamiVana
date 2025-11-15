const mongoose = require('mongoose');  // ✅ Add this line at the very top

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
 email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  rollNo: { type: String, default: null } // not required, can be added later
});

module.exports = mongoose.model('User', userSchema);

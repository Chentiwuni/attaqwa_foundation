const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Associated user
  question: { type: String, required: true },
  answer: { type: String },
  isAnswered: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);

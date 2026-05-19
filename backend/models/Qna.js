const mongoose = require('mongoose');

const qnaSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ['pending', 'answered'], default: 'pending' },
  answer: { type: String },
  answeredAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Qna', qnaSchema);

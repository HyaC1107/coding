const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  sender: { type: String, required: true },
  content: { type: String },
  imageUrl: { type: String },
  readBy: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);

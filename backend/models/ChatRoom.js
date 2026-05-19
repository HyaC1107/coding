const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  roomType: { type: String, enum: ['CuCo', 'CuHe', 'CoHe'], required: true },
  participants: [{ type: String }],
  relatedId: { type: String },
  lastMessage: { type: String },
  lastMessageAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('ChatRoom', chatRoomSchema);

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  receiverId: { type: String, required: true },
  type: { type: String },
  message: { type: String, required: true },
  relatedId: { type: String },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);

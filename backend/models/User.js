const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  nickname: { type: String },
  name: { type: String, required: true },
  phoneNumber: { type: String },
  type: { type: String, default: 'customer' },
  profileImg: { type: String },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

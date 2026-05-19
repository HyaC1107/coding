const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  companyId: { type: String, required: true },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  rating: { type: Number, min: 1, max: 5, required: true },
  content: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);

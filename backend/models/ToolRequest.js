const mongoose = require('mongoose');

const toolRequestSchema = new mongoose.Schema({
  constructorId: { type: String, required: true },
  heavyId: { type: String },
  heavyType: { type: String },
  carType: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  region: { type: String },
  notes: { type: String },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending',
  },
  confirmedDate: { type: String },
  confirmedTime: { type: String },
  cancelReason: { type: String },
  updateRequest: {
    newStartDate: { type: String },
    newEndDate: { type: String },
    reason: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model('ToolRequest', toolRequestSchema);

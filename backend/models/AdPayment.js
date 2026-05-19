const mongoose = require('mongoose');

const adPaymentSchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdPlan', required: true },
  amount: { type: Number, required: true },
  expiredAt: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AdPayment', adPaymentSchema);

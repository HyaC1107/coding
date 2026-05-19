const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String },
  type: { type: String, enum: ['constructor', 'heavy'], required: true },

  companyName: { type: String },
  businessNumber: { type: String },
  address: { type: String },
  companyEmail: { type: String },
  profileImg: { type: String },

  // 시공업체 전용
  CBPImg: { type: String },
  personalIdImg: { type: String },
  leaseCarImg: { type: String },
  categories: [{ type: String }],
  afterService: { type: Boolean, default: false },
  certificates: [{ type: String }],
  guarantee: { type: String },
  homePage: { type: String },
  SNS: { type: String },
  youTube: { type: String },
  exposedLocation: [{ type: String }],
  additionalLocation: [{ type: String }],

  // 중장비업체 전용
  heavyType: { type: String },
  career: { type: Number },
  heavyTON: { type: String },
  frontImg: { type: String },
  sideImg: { type: String },
  rearImg: { type: String },
  freightCertImg: { type: String },
  pilotTrainingCertImg: { type: String },

  published: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);

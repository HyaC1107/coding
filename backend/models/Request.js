const mongoose = require('mongoose');

// 상태 코드
// 31: 업체 확인 대기 중
// 32: 업체 답변 대기 중
// 33: 방문 일정 확정
// 34: 시공 완료
// 41: 취소 요청 중
// 42: 취소 완료
// 51: 수정 요청 중

const requestSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  companyId: { type: String, required: true },
  companyType: { type: String, enum: ['constructor', 'heavy'], required: true },
  categories: [{ type: String }],
  region: { type: String },
  requestedDate: { type: String },
  requestedTime: { type: String },
  confirmedDate: { type: String },
  confirmedTime: { type: String },
  status: { type: Number, default: 31 },
  notes: { type: String },
  previousStatus: { type: Number },
  cancelReason: { type: String },
  updateRequest: {
    newDate: { type: String },
    newTime: { type: String },
    reason: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);

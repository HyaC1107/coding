const Company = require('../models/Company');
const Notice = require('../models/Notice');
const Faq = require('../models/Faq');
const Qna = require('../models/Qna');
const AdPlan = require('../models/AdPlan');
const Notification = require('../models/Notification');

const notify = (receiverId, type, message, relatedId) =>
  Notification.create({ receiverId, type, message, relatedId: relatedId ? String(relatedId) : undefined });

// ─── 파트너 심사 ────────────────────────────────────────────

exports.getCompanies = async (req, res) => {
  const { status, type } = req.query;
  try {
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    const companies = await Company.find(filter).select('-password').sort({ createdAt: -1 });
    return res.status(200).json(companies);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.approveCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', published: true },
      { new: true }
    ).select('-password');
    if (!company) return res.status(404).json({ message: '업체를 찾을 수 없습니다.' });
    await notify(company.userId, 'approve', '파트너 가입이 승인되었습니다. 서비스를 이용하실 수 있습니다.', company._id);
    return res.status(200).json(company);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.rejectCompany = async (req, res) => {
  const { reason } = req.body;
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', published: false },
      { new: true }
    ).select('-password');
    if (!company) return res.status(404).json({ message: '업체를 찾을 수 없습니다.' });
    const msg = reason
      ? `파트너 가입이 반려되었습니다. 사유: ${reason}`
      : '파트너 가입이 반려되었습니다.';
    await notify(company.userId, 'reject', msg, company._id);
    return res.status(200).json(company);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// ─── 공지사항 ────────────────────────────────────────────────

exports.createNotice = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(422).json({ message: '제목과 내용을 입력해주세요.' });
  try {
    const notice = await Notice.create({ title, content });
    return res.status(201).json(notice);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.updateNotice = async (req, res) => {
  const { title, content } = req.body;
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content } },
      { new: true }
    );
    if (!notice) return res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' });
    return res.status(200).json(notice);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// ─── FAQ ─────────────────────────────────────────────────────

exports.createFaq = async (req, res) => {
  const { question, answer, category } = req.body;
  if (!question || !answer) return res.status(422).json({ message: '질문과 답변을 입력해주세요.' });
  try {
    const faq = await Faq.create({ question, answer, category });
    return res.status(201).json(faq);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.updateFaq = async (req, res) => {
  const { question, answer, category } = req.body;
  try {
    const faq = await Faq.findByIdAndUpdate(
      req.params.id,
      { $set: { question, answer, category } },
      { new: true }
    );
    if (!faq) return res.status(404).json({ message: 'FAQ를 찾을 수 없습니다.' });
    return res.status(200).json(faq);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ message: 'FAQ를 찾을 수 없습니다.' });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// ─── QnA 답변 ────────────────────────────────────────────────

exports.getQnas = async (req, res) => {
  const { status } = req.query;
  try {
    const filter = {};
    if (status) filter.status = status;
    const qnas = await Qna.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(qnas);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.answerQna = async (req, res) => {
  const { answer } = req.body;
  if (!answer) return res.status(422).json({ message: '답변 내용을 입력해주세요.' });
  try {
    const qna = await Qna.findByIdAndUpdate(
      req.params.id,
      { answer, status: 'answered', answeredAt: new Date() },
      { new: true }
    );
    if (!qna) return res.status(404).json({ message: 'QnA를 찾을 수 없습니다.' });
    await notify(qna.userId, 'qna', '문의하신 내용에 답변이 등록되었습니다.', qna._id);
    return res.status(200).json(qna);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// ─── 광고 플랜 ───────────────────────────────────────────────

exports.createAdPlan = async (req, res) => {
  const { name, price, duration, description } = req.body;
  if (!name || !price || !duration) return res.status(422).json({ message: '필수 항목이 누락되었습니다.' });
  try {
    const plan = await AdPlan.create({ name, price, duration, description });
    return res.status(201).json(plan);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.updateAdPlan = async (req, res) => {
  const { name, price, duration, description, isActive } = req.body;
  try {
    const plan = await AdPlan.findByIdAndUpdate(
      req.params.id,
      { $set: { name, price, duration, description, isActive } },
      { new: true }
    );
    if (!plan) return res.status(404).json({ message: '광고 플랜을 찾을 수 없습니다.' });
    return res.status(200).json(plan);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.deleteAdPlan = async (req, res) => {
  try {
    const plan = await AdPlan.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!plan) return res.status(404).json({ message: '광고 플랜을 찾을 수 없습니다.' });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

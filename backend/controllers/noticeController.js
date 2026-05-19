const Notice = require('../models/Notice');
const Faq = require('../models/Faq');

exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    return res.status(200).json(notices);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' });
    return res.status(200).json(notice);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });
    return res.status(200).json(faqs);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

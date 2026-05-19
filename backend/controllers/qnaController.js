const Qna = require('../models/Qna');

exports.createQna = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;
  try {
    const qna = await Qna.create({ userId, title, content });
    return res.status(201).json(qna);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getQnas = async (req, res) => {
  const userId = req.query.userId || req.user.userId;
  try {
    const qnas = await Qna.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(qnas);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

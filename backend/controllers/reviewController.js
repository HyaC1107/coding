const Review = require('../models/review');

exports.createReview = async (req, res) => {
  const { companyId, requestId, rating, content } = req.body;
  const customerId = req.user.userId;
  try {
    const review = await Review.create({ customerId, companyId, requestId, rating, content });
    return res.status(201).json(review);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getReviews = async (req, res) => {
  const { companyId, customerId } = req.query;
  try {
    const filter = {};
    if (companyId) filter.companyId = companyId;
    if (customerId) filter.customerId = customerId;
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

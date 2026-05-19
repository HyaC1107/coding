const AdPlan = require('../models/AdPlan');
const AdPayment = require('../models/AdPayment');

exports.getPlans = async (req, res) => {
  try {
    const plans = await AdPlan.find({ isActive: true });
    return res.status(200).json(plans);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.createPayment = async (req, res) => {
  const { planId } = req.body;
  const companyId = req.user.userId;
  try {
    const plan = await AdPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: '광고 플랜을 찾을 수 없습니다.' });

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + plan.duration);

    const payment = await AdPayment.create({ companyId, planId, amount: plan.price, expiredAt });
    return res.status(201).json({ success: true, payment, expiredAt });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getPayments = async (req, res) => {
  const companyId = req.query.companyId || req.user.userId;
  try {
    const payments = await AdPayment.find({ companyId }).populate('planId').sort({ createdAt: -1 });
    return res.status(200).json(payments);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

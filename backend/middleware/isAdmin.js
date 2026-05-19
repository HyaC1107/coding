const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: '관리자 권한이 필요합니다.' });
    }
    next();
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

const User = require('../models/User');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }).select('-password');
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.updateUser = async (req, res) => {
  const { nickname, phoneNumber } = req.body;
  try {
    const update = { nickname, phoneNumber };
    if (req.file) update.profileImg = req.file.path;

    const user = await User.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: update },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

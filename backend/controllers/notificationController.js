const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  const userId = req.query.userId || req.user.userId;
  try {
    const notifications = await Notification.find({ receiverId: userId }).sort({ createdAt: -1 });
    return res.status(200).json(notifications);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.readNotification = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.readAll = async (req, res) => {
  const userId = req.body.userId || req.user.userId;
  try {
    await Notification.updateMany({ receiverId: userId, isRead: false }, { isRead: true });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

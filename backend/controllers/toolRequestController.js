const ToolRequest = require('../models/ToolRequest');
const Notification = require('../models/Notification');

const notify = (receiverId, type, message, relatedId) =>
  Notification.create({ receiverId, type, message, relatedId: String(relatedId) });

exports.getAvailable = async (req, res) => {
  const { heavyType, region } = req.query;
  try {
    const filter = { status: 'pending' };
    if (heavyType) filter.heavyType = heavyType;
    if (region) filter.region = region;
    const requests = await ToolRequest.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(requests);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.createToolRequest = async (req, res) => {
  const { heavyType, carType, startDate, endDate, region, notes } = req.body;
  const constructorId = req.user.userId;
  try {
    const tr = await ToolRequest.create({ constructorId, heavyType, carType, startDate, endDate, region, notes });
    return res.status(201).json(tr);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getToolRequests = async (req, res) => {
  const { constructorId, heavyId, status } = req.query;
  try {
    const filter = {};
    if (constructorId) filter.constructorId = constructorId;
    if (heavyId) filter.heavyId = heavyId;
    if (status) filter.status = status;
    const requests = await ToolRequest.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(requests);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.acceptToolRequest = async (req, res) => {
  const { confirmedDate, confirmedTime } = req.body;
  try {
    const tr = await ToolRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted', heavyId: req.user.userId, confirmedDate, confirmedTime },
      { new: true }
    );
    if (!tr) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    await notify(tr.constructorId, 'accept', '장비 렌탈 요청이 수락되었습니다.', tr._id);
    return res.status(200).json(tr);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.rejectToolRequest = async (req, res) => {
  const { reason } = req.body;
  try {
    const tr = await ToolRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', cancelReason: reason },
      { new: true }
    );
    if (!tr) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    await notify(tr.constructorId, 'reject', '장비 렌탈 요청이 거절되었습니다.', tr._id);
    return res.status(200).json(tr);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.completeToolRequest = async (req, res) => {
  try {
    const tr = await ToolRequest.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
    if (!tr) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    await notify(tr.constructorId, 'complete', '장비 렌탈이 완료되었습니다.', tr._id);
    return res.status(200).json(tr);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.cancelToolRequest = async (req, res) => {
  const { reason } = req.body;
  try {
    const tr = await ToolRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', cancelReason: reason },
      { new: true }
    );
    if (!tr) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    const target = req.user.userId === tr.constructorId ? tr.heavyId : tr.constructorId;
    if (target) await notify(target, 'cancel', '장비 렌탈이 취소되었습니다.', tr._id);
    return res.status(200).json(tr);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.updateToolRequest = async (req, res) => {
  const { newStartDate, newEndDate, reason } = req.body;
  try {
    const tr = await ToolRequest.findByIdAndUpdate(
      req.params.id,
      { updateRequest: { newStartDate, newEndDate, reason } },
      { new: true }
    );
    if (!tr) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    if (tr.heavyId) await notify(tr.heavyId, 'update', '렌탈 일정 변경이 요청되었습니다.', tr._id);
    return res.status(200).json(tr);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

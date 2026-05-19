const Request = require('../models/Request');
const Notification = require('../models/Notification');

const notify = (receiverId, type, message, relatedId) =>
  Notification.create({ receiverId, type, message, relatedId: String(relatedId) });

exports.createRequest = async (req, res) => {
  const { companies, categories, region, requestedDate, requestedTime, notes } = req.body;
  const customerId = req.user.userId;
  try {
    if (!companies || !companies.length) {
      return res.status(422).json({ message: '업체를 선택해주세요.' });
    }
    const requests = await Promise.all(
      companies.map(({ companyId, companyType }) =>
        Request.create({ customerId, companyId, companyType, categories, region, requestedDate, requestedTime, notes, status: 31 })
      )
    );
    await Promise.all(requests.map((r) => notify(r.companyId, 'request', '새로운 시공 요청이 도착했습니다.', r._id)));
    return res.status(201).json({ success: true, requests });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getRequests = async (req, res) => {
  const { customerId, companyId, status } = req.query;
  try {
    const filter = {};
    if (customerId) filter.customerId = customerId;
    if (companyId) filter.companyId = companyId;
    if (status) filter.status = Number(status);
    const requests = await Request.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(requests);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    return res.status(200).json(request);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, { status: 32 }, { new: true });
    if (!request) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    await notify(request.customerId, 'accept', '업체가 요청을 확인했습니다.', request._id);
    return res.status(200).json(request);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.rejectRequest = async (req, res) => {
  const { reason } = req.body;
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: 42, cancelReason: reason },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    await notify(request.customerId, 'reject', '업체가 요청을 거절했습니다.', request._id);
    return res.status(200).json(request);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.setSchedule = async (req, res) => {
  const { confirmedDate, confirmedTime } = req.body;
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: 33, confirmedDate, confirmedTime },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    await notify(request.customerId, 'schedule', `방문 일정이 확정되었습니다. ${confirmedDate} ${confirmedTime}`, request._id);
    return res.status(200).json(request);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.completeRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, { status: 34 }, { new: true });
    if (!request) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    await notify(request.customerId, 'complete', '시공이 완료되었습니다.', request._id);
    return res.status(200).json(request);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.cancelRequest = async (req, res) => {
  const { reason } = req.body;
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });

    const isCompany = req.user.userId === request.companyId;
    const newStatus = isCompany ? 42 : 41;
    await request.updateOne({ status: newStatus, previousStatus: request.status, cancelReason: reason });

    const target = isCompany ? request.customerId : request.companyId;
    const msg = isCompany ? '업체가 취소를 확정했습니다.' : '고객이 취소를 요청했습니다.';
    await notify(target, 'cancel', msg, request._id);
    return res.status(200).json({ ...request.toObject(), status: newStatus });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.cancelAccept = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    if (request.status !== 41) return res.status(400).json({ message: '취소 요청 상태가 아닙니다.' });

    await request.updateOne({ status: 42 });
    await notify(request.customerId, 'cancel', '업체가 취소 요청을 수락했습니다.', request._id);
    return res.status(200).json({ ...request.toObject(), status: 42 });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.cancelReject = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    if (request.status !== 41) return res.status(400).json({ message: '취소 요청 상태가 아닙니다.' });

    const revertTo = request.previousStatus || 33;
    await request.updateOne({ status: revertTo, previousStatus: null });
    await notify(request.customerId, 'cancel', '업체가 취소 요청을 거절했습니다.', request._id);
    return res.status(200).json({ ...request.toObject(), status: revertTo });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.updateRequest = async (req, res) => {
  const { newDate, newTime, reason } = req.body;
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });

    await request.updateOne({ status: 51, previousStatus: request.status, updateRequest: { newDate, newTime, reason } });
    await notify(request.companyId, 'update', '고객이 일정 변경을 요청했습니다.', request._id);
    return res.status(200).json({ ...request.toObject(), status: 51 });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.updateAccept = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    if (request.status !== 51) return res.status(400).json({ message: '일정 변경 요청 상태가 아닙니다.' });

    const { newDate, newTime } = request.updateRequest;
    await request.updateOne({
      status: 33,
      confirmedDate: newDate,
      confirmedTime: newTime,
      previousStatus: null,
      updateRequest: {},
    });
    await notify(request.customerId, 'update', `일정 변경이 확정되었습니다. ${newDate} ${newTime}`, request._id);
    return res.status(200).json({ ...request.toObject(), status: 33, confirmedDate: newDate, confirmedTime: newTime });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.updateReject = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    if (request.status !== 51) return res.status(400).json({ message: '일정 변경 요청 상태가 아닙니다.' });

    const revertTo = request.previousStatus || 33;
    await request.updateOne({ status: revertTo, previousStatus: null, updateRequest: {} });
    await notify(request.customerId, 'update', '업체가 일정 변경 요청을 거절했습니다.', request._id);
    return res.status(200).json({ ...request.toObject(), status: revertTo });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

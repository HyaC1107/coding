const Company = require('../models/Company');

exports.getCompanies = async (req, res) => {
  const { region, category, type } = req.query;
  try {
    const filter = { status: 'approved', published: true };
    if (type) filter.type = type;
    if (category) filter.categories = category;
    if (region) filter.exposedLocation = region;

    const companies = await Company.find(filter).select('-password');
    return res.status(200).json(companies);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.params.companyId }).select('-password');
    if (!company) return res.status(404).json({ message: '업체를 찾을 수 없습니다.' });
    return res.status(200).json(company);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const files = req.files || {};
    const getPath = (field) => (files[field] ? files[field][0].path : undefined);

    const update = { ...req.body };
    ['profileImg', 'CBPImg', 'personalIdImg', 'leaseCarImg',
      'frontImg', 'sideImg', 'rearImg', 'freightCertImg', 'pilotTrainingCertImg'].forEach((f) => {
      const p = getPath(f);
      if (p) update[f] = p;
    });
    ['categories', 'certificates', 'exposedLocation', 'additionalLocation'].forEach((f) => {
      if (typeof update[f] === 'string') update[f] = JSON.parse(update[f]);
    });

    const company = await Company.findOneAndUpdate(
      { userId: req.params.companyId },
      { $set: update },
      { new: true }
    ).select('-password');
    if (!company) return res.status(404).json({ message: '업체를 찾을 수 없습니다.' });
    return res.status(200).json(company);
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.requestUpdate = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.params.companyId });
    if (!company) return res.status(404).json({ message: '업체를 찾을 수 없습니다.' });
    return res.status(200).json({ success: true, message: '수정 요청이 접수되었습니다. 관리자 검토 후 반영됩니다.' });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

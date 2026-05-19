const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');

const signToken = (user) =>
  jwt.sign(
    { user: { userId: user.userId, name: user.name, type: user.type } },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

exports.check = async (req, res) => {
  const { userId } = req.body;
  try {
    const exists = (await User.findOne({ userId })) || (await Company.findOne({ userId }));
    return res.status(200).json({ available: !exists });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.register = async (req, res) => {
  const { userId, password, email, nickname, name, phoneNumber } = req.body;
  if (!userId || !password || !email || !name) {
    return res.status(422).json({ message: '필수 항목이 누락되었습니다.' });
  }
  try {
    const exists = (await User.findOne({ userId })) || (await Company.findOne({ userId }));
    if (exists) return res.status(400).json({ message: '이미 등록되어 있는 계정입니다.' });

    const hashed = await bcrypt.hash(password, 12);
    await User.create({ userId, email, password: hashed, nickname, name, phoneNumber, type: 'customer' });
    return res.status(201).json({ success: true, message: '회원가입이 완료되었습니다.' });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.registerPartner = async (req, res) => {
  const {
    userId, password, email, name, phoneNumber, type,
    companyName, businessNumber, address, companyEmail,
    categories, afterService, certificates, guarantee,
    homePage, SNS, youTube, exposedLocation, additionalLocation,
    heavyType, career, heavyTON,
  } = req.body;

  if (!userId || !password || !email || !name || !type) {
    return res.status(422).json({ message: '필수 항목이 누락되었습니다.' });
  }
  if (!['constructor', 'heavy'].includes(type)) {
    return res.status(400).json({ message: '잘못된 파트너 유형입니다.' });
  }

  try {
    const exists = (await User.findOne({ userId })) || (await Company.findOne({ userId }));
    if (exists) return res.status(400).json({ message: '이미 등록되어 있는 계정입니다.' });

    const hashed = await bcrypt.hash(password, 12);
    const files = req.files || {};
    const getPath = (field) => (files[field] ? files[field][0].path : undefined);

    const parseArr = (val) => {
      if (!val) return [];
      return typeof val === 'string' ? JSON.parse(val) : val;
    };

    const data = {
      userId, email, password: hashed, name, phoneNumber, type,
      companyName, businessNumber, address, companyEmail,
      homePage, SNS, youTube,
      profileImg: getPath('profileImg'),
      CBPImg: getPath('CBPImg'),
      personalIdImg: getPath('personalIdImg'),
      exposedLocation: parseArr(exposedLocation),
      additionalLocation: parseArr(additionalLocation),
      status: 'pending',
    };

    if (type === 'constructor') {
      Object.assign(data, {
        leaseCarImg: getPath('leaseCarImg'),
        categories: parseArr(categories),
        afterService: afterService === 'true',
        certificates: parseArr(certificates),
        guarantee,
      });
    } else {
      Object.assign(data, {
        heavyType, career: Number(career), heavyTON,
        frontImg: getPath('frontImg'),
        sideImg: getPath('sideImg'),
        rearImg: getPath('rearImg'),
        freightCertImg: getPath('freightCertImg'),
        pilotTrainingCertImg: getPath('pilotTrainingCertImg'),
      });
    }

    await Company.create(data);
    return res.status(201).json({ success: true, message: '파트너 가입 신청이 완료되었습니다. 관리자 심사 후 승인됩니다.' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.login = async (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(422).json({ message: '아이디와 비밀번호를 입력해주세요.' });
  }
  try {
    const user = (await User.findOne({ userId })) || (await Company.findOne({ userId }));
    if (!user) return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });

    if (user.type !== 'customer' && user.status !== 'approved') {
      return res.status(403).json({ message: '관리자 승인 대기 중입니다.', status: user.status });
    }

    const token = signToken(user);
    return res.status(200).json({ token, userId: user.userId, name: user.name, type: user.type });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.findId = async (req, res) => {
  const { name, phoneNumber, email } = req.body;
  try {
    const user =
      (await User.findOne({ name, phoneNumber, email })) ||
      (await Company.findOne({ name, phoneNumber, email }));
    if (!user) return res.status(404).json({ message: '일치하는 계정을 찾을 수 없습니다.' });
    return res.status(200).json({ userId: user.userId });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.findPw = async (req, res) => {
  const { userId, name, phoneNumber, email } = req.body;
  try {
    const user =
      (await User.findOne({ userId, name, phoneNumber, email })) ||
      (await Company.findOne({ userId, name, phoneNumber, email }));
    if (!user) return res.status(404).json({ message: '일치하는 계정을 찾을 수 없습니다.' });
    // 실제 운영: 이메일로 재설정 링크 발송
    return res.status(200).json({ success: true, message: '비밀번호 재설정 안내가 발송되었습니다.' });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user.userId }).select('status');
    if (!company) return res.status(404).json({ message: '파트너 계정을 찾을 수 없습니다.' });
    return res.status(200).json({ status: company.status });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

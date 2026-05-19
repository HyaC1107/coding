require('dotenv').config();
const mongoose = require('mongoose');
const AdPlan = require('./models/AdPlan');
const Notice = require('./models/Notice');
const Faq = require('./models/Faq');

const adPlans = [
  {
    name: '베이직',
    price: 30000,
    duration: 30,
    description: '검색 결과 기본 노출. 업체 프로필 배지 표시.',
    isActive: true,
  },
  {
    name: '스탠다드',
    price: 70000,
    duration: 30,
    description: '검색 결과 상단 노출. 추천 업체 섹션 포함.',
    isActive: true,
  },
  {
    name: '프리미엄',
    price: 150000,
    duration: 30,
    description: '메인 배너 노출 + 검색 최상단 고정. 전담 매니저 지원.',
    isActive: true,
  },
];

const notices = [
  {
    title: 'Pick 서비스 오픈 안내',
    content: '안녕하세요, Pick입니다.\n\n인테리어·시공 파트너 매칭 서비스 Pick이 정식 오픈했습니다.\n고객과 파트너 모두에게 더 나은 서비스를 제공할 수 있도록 최선을 다하겠습니다.\n감사합니다.',
  },
  {
    title: '파트너 가입 심사 기준 안내',
    content: '파트너(시공업체/중장비업체) 가입 심사는 영업일 기준 3~5일 소요됩니다.\n제출 서류가 미흡할 경우 반려될 수 있으며, 반려 시 재신청이 가능합니다.\n\n필수 서류:\n- 사업자등록증\n- 신분증\n- 사업장 사진\n\n문의사항은 고객센터로 연락해 주세요.',
  },
  {
    title: '서비스 이용 유의사항',
    content: '픽 서비스 이용 시 아래 사항을 유의해 주세요.\n\n1. 업체 선택 후 요청 취소는 확정 전까지 가능합니다.\n2. 시공 완료 후 리뷰는 30일 이내 작성 가능합니다.\n3. 허위 리뷰 작성 시 서비스 이용이 제한될 수 있습니다.',
  },
];

const faqs = [
  {
    question: '고객 회원가입은 어떻게 하나요?',
    answer: '앱 실행 후 회원가입 버튼을 눌러 아이디, 비밀번호, 이름, 연락처, 이메일을 입력하시면 바로 가입됩니다.',
    category: '회원',
  },
  {
    question: '파트너(업체) 가입 심사는 얼마나 걸리나요?',
    answer: '영업일 기준 3~5일 소요됩니다. 서류 검토 후 승인/반려 결과를 앱 알림으로 안내드립니다.',
    category: '회원',
  },
  {
    question: '업체를 최대 몇 개까지 선택할 수 있나요?',
    answer: '한 번의 요청에 최대 3개 업체를 선택할 수 있습니다.',
    category: '서비스',
  },
  {
    question: '요청을 취소하고 싶어요.',
    answer: '일정 확정 전이라면 일정 관리 화면에서 직접 취소 요청이 가능합니다. 일정 확정 후에는 업체 동의가 필요합니다.',
    category: '서비스',
  },
  {
    question: '채팅은 어떻게 사용하나요?',
    answer: '하단 메뉴의 Talk 탭에서 업체와 1:1 채팅이 가능합니다. 이미지 첨부도 지원합니다.',
    category: '서비스',
  },
  {
    question: '리뷰는 언제 작성할 수 있나요?',
    answer: '시공이 완료 처리된 후 30일 이내에 리뷰를 작성할 수 있습니다.',
    category: '리뷰',
  },
  {
    question: '광고는 어떤 효과가 있나요?',
    answer: '광고 플랜 가입 시 검색 결과 상단 노출, 추천 업체 섹션 노출 등의 혜택이 제공됩니다. 플랜별 세부 혜택은 광고 결제 화면을 참고해 주세요.',
    category: '광고',
  },
  {
    question: '아이디/비밀번호를 잊어버렸어요.',
    answer: '로그인 화면 하단의 아이디 찾기 / 비밀번호 찾기를 이용해 주세요. 가입 시 등록한 이름, 연락처, 이메일로 확인 가능합니다.',
    category: '회원',
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('[MongoDB] connected');

  const planCount = await AdPlan.countDocuments();
  if (planCount === 0) {
    await AdPlan.insertMany(adPlans);
    console.log(`[Seed] AdPlan ${adPlans.length}건 삽입 완료`);
  } else {
    console.log(`[Seed] AdPlan 이미 ${planCount}건 존재 — 스킵`);
  }

  const noticeCount = await Notice.countDocuments();
  if (noticeCount === 0) {
    await Notice.insertMany(notices);
    console.log(`[Seed] Notice ${notices.length}건 삽입 완료`);
  } else {
    console.log(`[Seed] Notice 이미 ${noticeCount}건 존재 — 스킵`);
  }

  const faqCount = await Faq.countDocuments();
  if (faqCount === 0) {
    await Faq.insertMany(faqs);
    console.log(`[Seed] FAQ ${faqs.length}건 삽입 완료`);
  } else {
    console.log(`[Seed] FAQ 이미 ${faqCount}건 존재 — 스킵`);
  }

  await mongoose.disconnect();
  console.log('[Seed] 완료');
}

seed().catch((e) => { console.error(e); process.exit(1); });

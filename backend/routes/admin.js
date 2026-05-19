const router = require('express').Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const ctrl = require('../controllers/adminController');

router.use(auth, isAdmin);

// 파트너 심사
router.get('/companies', ctrl.getCompanies);
router.patch('/companies/:id/approve', ctrl.approveCompany);
router.patch('/companies/:id/reject', ctrl.rejectCompany);

// 공지사항
router.post('/notices', ctrl.createNotice);
router.patch('/notices/:id', ctrl.updateNotice);
router.delete('/notices/:id', ctrl.deleteNotice);

// FAQ
router.post('/faqs', ctrl.createFaq);
router.patch('/faqs/:id', ctrl.updateFaq);
router.delete('/faqs/:id', ctrl.deleteFaq);

// QnA
router.get('/qna', ctrl.getQnas);
router.patch('/qna/:id/answer', ctrl.answerQna);

// 광고 플랜
router.post('/ad/plans', ctrl.createAdPlan);
router.patch('/ad/plans/:id', ctrl.updateAdPlan);
router.delete('/ad/plans/:id', ctrl.deleteAdPlan);

module.exports = router;

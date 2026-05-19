const router = require('express').Router();
const ctrl = require('../controllers/noticeController');

router.get('/', ctrl.getNotices);
router.get('/faqs', ctrl.getFaqs);
router.get('/:id', ctrl.getNotice);

module.exports = router;

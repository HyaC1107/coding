const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const ctrl = require('../controllers/authController');

router.post('/check', ctrl.check);
router.post('/register', ctrl.register);
router.post('/register/partner', upload.fields([
  { name: 'profileImg', maxCount: 1 },
  { name: 'CBPImg', maxCount: 1 },
  { name: 'personalIdImg', maxCount: 1 },
  { name: 'leaseCarImg', maxCount: 1 },
  { name: 'frontImg', maxCount: 1 },
  { name: 'sideImg', maxCount: 1 },
  { name: 'rearImg', maxCount: 1 },
  { name: 'freightCertImg', maxCount: 1 },
  { name: 'pilotTrainingCertImg', maxCount: 1 },
]), ctrl.registerPartner);
router.post('/login', ctrl.login);
router.post('/findId', ctrl.findId);
router.post('/findPw', ctrl.findPw);
router.get('/status', auth, ctrl.getStatus);

module.exports = router;

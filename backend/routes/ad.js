const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/adController');

router.get('/plans', ctrl.getPlans);
router.post('/payments', auth, ctrl.createPayment);
router.get('/payments', auth, ctrl.getPayments);

module.exports = router;

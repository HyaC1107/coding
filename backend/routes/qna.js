const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/qnaController');

router.post('/', auth, ctrl.createQna);
router.get('/', auth, ctrl.getQnas);

module.exports = router;

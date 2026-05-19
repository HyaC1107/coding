const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/reviewController');

router.post('/', auth, ctrl.createReview);
router.get('/', ctrl.getReviews);

module.exports = router;

const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/notificationController');

router.get('/', auth, ctrl.getNotifications);
router.patch('/read-all', auth, ctrl.readAll);
router.patch('/:id/read', auth, ctrl.readNotification);

module.exports = router;

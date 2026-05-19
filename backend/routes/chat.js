const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const ctrl = require('../controllers/chatController');

router.get('/rooms', auth, ctrl.getRooms);
router.post('/rooms', auth, ctrl.getOrCreateRoom);
router.get('/:roomId/messages', auth, ctrl.getMessages);
router.post('/:roomId/message', auth, upload.single('image'), ctrl.sendMessage);

module.exports = router;

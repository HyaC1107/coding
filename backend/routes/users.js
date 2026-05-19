const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const ctrl = require('../controllers/userController');

router.get('/:userId', auth, ctrl.getUser);
router.patch('/:userId', auth, upload.single('profileImg'), ctrl.updateUser);

module.exports = router;

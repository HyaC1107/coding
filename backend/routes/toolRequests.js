const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/toolRequestController');

router.post('/', auth, ctrl.createToolRequest);
router.get('/available', auth, ctrl.getAvailable);
router.get('/', auth, ctrl.getToolRequests);
router.patch('/:id/accept', auth, ctrl.acceptToolRequest);
router.patch('/:id/reject', auth, ctrl.rejectToolRequest);
router.patch('/:id/complete', auth, ctrl.completeToolRequest);
router.patch('/:id/cancel', auth, ctrl.cancelToolRequest);
router.patch('/:id/update', auth, ctrl.updateToolRequest);

module.exports = router;

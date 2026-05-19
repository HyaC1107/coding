const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/requestController');

router.post('/', auth, ctrl.createRequest);
router.get('/', auth, ctrl.getRequests);
router.get('/:id', auth, ctrl.getRequest);
router.patch('/:id/accept', auth, ctrl.acceptRequest);
router.patch('/:id/reject', auth, ctrl.rejectRequest);
router.patch('/:id/setSchedule', auth, ctrl.setSchedule);
router.patch('/:id/complete', auth, ctrl.completeRequest);
router.patch('/:id/cancel', auth, ctrl.cancelRequest);
router.patch('/:id/cancel/accept', auth, ctrl.cancelAccept);
router.patch('/:id/cancel/reject', auth, ctrl.cancelReject);
router.patch('/:id/update', auth, ctrl.updateRequest);
router.patch('/:id/update/accept', auth, ctrl.updateAccept);
router.patch('/:id/update/reject', auth, ctrl.updateReject);

module.exports = router;

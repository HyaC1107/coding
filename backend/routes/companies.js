const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const ctrl = require('../controllers/companyController');

router.get('/', ctrl.getCompanies);
router.get('/:companyId', ctrl.getCompany);
router.patch('/:companyId', auth, upload.fields([
  { name: 'profileImg', maxCount: 1 },
  { name: 'CBPImg', maxCount: 1 },
  { name: 'personalIdImg', maxCount: 1 },
  { name: 'leaseCarImg', maxCount: 1 },
  { name: 'frontImg', maxCount: 1 },
  { name: 'sideImg', maxCount: 1 },
  { name: 'rearImg', maxCount: 1 },
  { name: 'freightCertImg', maxCount: 1 },
  { name: 'pilotTrainingCertImg', maxCount: 1 },
]), ctrl.updateCompany);
router.post('/:companyId/update-request', auth, ctrl.requestUpdate);

module.exports = router;

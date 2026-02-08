const express = require('express');
const router = express.Router();
const evidenceController = require('../controllers/evidenceController');

router.get('/', evidenceController.listEvidence);
router.post('/', evidenceController.createEvidence);
router.post('/search', evidenceController.searchEvidence);
router.post('/export', evidenceController.exportEvidence);
router.get('/:id', evidenceController.getEvidence);
router.put('/:id', evidenceController.updateEvidence);
router.delete('/:id', evidenceController.deleteEvidence);

module.exports = router;

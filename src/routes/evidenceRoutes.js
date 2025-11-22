const express = require('express');
const router = express.Router();
const evidenceController = require('../controllers/evidenceController');

router.get('/', evidenceController.listEvidence);
router.post('/', evidenceController.createEvidence);

module.exports = router;

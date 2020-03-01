const { Router } = require('express');
const { getIndex } = require('../controllers/orchestrator');

const router = Router();

router.get('/', getIndex);

module.exports = router;

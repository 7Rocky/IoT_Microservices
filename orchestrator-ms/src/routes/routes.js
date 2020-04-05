const { Router } = require('express');
const OrchestratorController = require('../controllers/orchestrator.controller');

const router = Router();
const orchestratorController = new OrchestratorController();

router.get('/', orchestratorController.getIndex);
router.get('/login', orchestratorController.login);

module.exports = router;

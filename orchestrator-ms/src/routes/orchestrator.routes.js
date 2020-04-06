const { Router } = require('express');

const OrchestratorController = require('../controllers/orchestrator.controller');
const JwtModule = require('../modules/jwt.module');

const router = Router();
const orchestratorController = new OrchestratorController();
const jwt = new JwtModule();

router.get('/', jwt.verifyToken, orchestratorController.getIndex);
router.post('/login', orchestratorController.login);
router.post('/register', orchestratorController.register);

module.exports = router;

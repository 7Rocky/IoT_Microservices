const { Router } = require('express');

const OrchestratorController = require('../controllers/orchestrator.controller');
const JwtModule = require('../modules/jwt.module');

const router = Router();
const orchestratorController = new OrchestratorController();
const jwt = new JwtModule();

router.get('/', jwt.verifyToken, orchestratorController.getIndex);
router.get('/login', orchestratorController.login);
router.get('/register', orchestratorController.register);

module.exports = router;

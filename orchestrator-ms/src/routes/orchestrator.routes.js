const { Router } = require('express');

const OrchestratorController = require('../controllers/orchestrator.controller');
const JwtModule = require('../modules/jwt.module');

const router = Router();
const orchestratorController = new OrchestratorController();
const jwt = new JwtModule();

const verifyMS = (req, res, next) => {
  console.log(req.ip, req.hostname);
  next();
};

router.get('/temperature', jwt.verifyToken, orchestratorController.connectTemperatureService);
router.get('/microcontrollers/:measure', verifyMS, orchestratorController.getMicrocontrollers);
router.post('/microcontrollers', verifyMS, orchestratorController.postMicrocontrollers);
router.put('/microcontrollers', verifyMS, orchestratorController.putMicrocontrollers);
router.delete('/microcontrollers', verifyMS, orchestratorController.deleteMicrocontrollers);
router.post('/login', orchestratorController.login);
router.post('/register', orchestratorController.register);

module.exports = router;

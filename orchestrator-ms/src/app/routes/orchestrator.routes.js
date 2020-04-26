const { Router } = require('express');
const expressJwt = require('express-jwt');

const { TOKEN_SECRET } = require('../../config/jwt.config');
const OrchestratorController = require('../controllers/orchestrator.controller');

const jwtMiddleware = expressJwt({ secret: TOKEN_SECRET });
const orchestratorController = new OrchestratorController();
const router = Router();

router.use((req, res, next) => {
  //console.log(req.ip, req.hostname);
  next();
});

router.get('/temperature', jwtMiddleware, orchestratorController.connectTemperatureService);
router.get('/microcontrollers', jwtMiddleware, orchestratorController.getMicrocontrollers);
router.get('/microcontrollers/:measure', orchestratorController.getMicrocontrollersFromMS);
router.post('/microcontrollers', jwtMiddleware, orchestratorController.postMicrocontrollers);
router.put('/microcontrollers', jwtMiddleware, orchestratorController.putMicrocontrollers);
router.delete('/microcontrollers', jwtMiddleware, orchestratorController.deleteMicrocontrollers);
router.post('/login', orchestratorController.login);
router.post('/register', orchestratorController.register);
router.post('/refresh', orchestratorController.refresh);

router.use((error, req, res, next) => {
  if (error.name === expressJwt.UnauthorizedError.name) {
    res.sendStatus(401);
  }
});

module.exports = router;

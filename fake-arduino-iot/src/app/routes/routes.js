const { Router } = require('express');
const router = Router();

const Controller = require('../controller/controller');
const controller = new Controller();

router.get('/temperature', controller.getTemperature);

router.get('/humidity', controller.getHumidity);

module.exports = router;

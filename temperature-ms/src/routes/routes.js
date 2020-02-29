const { Router } = require('express');
const { getIndex, getPrueba, getTemperatures } = require('../controllers/temperature');
const router = Router();

router.get('/', getIndex);

router.get('/temperatures', getTemperatures);

router.get('/prueba', getPrueba);

module.exports = router;

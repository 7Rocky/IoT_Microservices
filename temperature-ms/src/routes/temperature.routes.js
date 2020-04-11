const { Router } = require('express');
const { getIndex, getTemperatures } = require('../controllers/temperature.controller');
const router = Router();

router.get('/', getIndex);
router.get('/temperatures', getTemperatures);

module.exports = router;

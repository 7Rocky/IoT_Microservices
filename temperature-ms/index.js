const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const PORT = process.env.PORT || 4000;
const ARDUINO = process.env.ARDUINO || 'localhost';
const REFRESH_TIME = 5000;
const app = express();

console.log(`Using ${process.env.ARDUINO ? '' : 'Fake-'}Arduino at: ${ARDUINO}`);

const getTemperature = url => axios.get(url);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  const url = `http://${ARDUINO}${req.query.path || '/temperature'}`;
  getTemperature(url)
    .then(response => res.status(response.status).json(response.data))
    .catch(error => console.log(error));
});

setInterval(() => {
  const url = `http://${ARDUINO}${'/temperature'}`;
  getTemperature(url)
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
}, REFRESH_TIME);

app.get('/prueba', (req, res) => res.json({ message: 'GET Prueba from other backend' }));

app.listen(PORT, () => console.log('temperature-ms listening at http://localhost:' + PORT));

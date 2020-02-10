const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 4000;
const ARDUINO = process.env.ARDUINO || '192.168.1.40';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  const options = {
    hostname: ARDUINO,
    method: 'GET',
    path: req.query.path || '/',
    port: req.query.port || 80
  };

  const request = http.request(options, response => {
    let dataString = '';

    response.on('data', data => dataString += data)
      .on('end', () => res.json({ arduino: JSON.parse(dataString), envs: process.env }));
  });

  request.on('error', error => console.error(error));
  request.end();
});

app.post('/', (req, res) => {
  const options = {
    hostname: ARDUINO,
    method: 'POST',
    path: req.query.path || '/hola',
    port: req.query.port || 80
  };

  const request = http.request(options, response => {
    let dataString = '';

    response.on('data', data => dataString += data)
      .on('end', () => res.json(JSON.parse(dataString)));
  });

  request.on('error', error => console.error(error));
  request.end();
});

app.get('/prueba', (req, res) => res.json({ message: 'GET Prueba from other backend' }));

app.post('/prueba', (req, res) => res.json({ data: req.body, message: 'POST Prueba from other backend' }));

app.listen(PORT, () => console.log('App listening at http://localhost:' + PORT));

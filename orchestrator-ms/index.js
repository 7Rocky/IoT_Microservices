const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  const options = {
    hostname: req.query.host,
    method: 'GET',
    path: req.query.path || '/',
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

app.post('/', (req, res) => {
  const options = {
    hostname: req.query.host,
    method: 'POST',
    path: req.query.path || '/',
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

app.listen(PORT, () => console.log('App listening at http://localhost:' + PORT))

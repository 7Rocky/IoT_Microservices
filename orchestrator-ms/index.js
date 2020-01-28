const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  const options = {
    hostname: '192.168.1.40',
    method: 'GET',
    path: '/',
    port: 80
  };

  const req = http.request(options, res => {
    let dataString = '';

    res.on('data', data => dataString += data)
      .on('end', () => response.json(JSON.parse(dataString)));
  });

  req.on('error', error => console.error(error));
  req.end();
});

app.listen(PORT, () => console.log(`orchestrator-ms runninig at ${PORT}`));

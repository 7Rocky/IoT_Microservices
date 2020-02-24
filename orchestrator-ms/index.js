const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  const { host, path, port } = req.query;
  const url = `http://${host}:${port || 80}`;

  console.log(url);

  axios.get(url, { params: { path } })
    .then(response => res.json(response.data))
    .catch(error => console.log(error));
});

app.listen(PORT, () => console.log('orchestrator-ms listening at http://localhost:' + PORT));

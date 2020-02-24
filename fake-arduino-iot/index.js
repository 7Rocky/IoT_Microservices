const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
const PORT = 80;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get('/temperature', (req, res) => {
  res.json({ temperature: [ Number((Math.random() * 100 + 400).toFixed()) ] });
});

app.get('/humidity', (req, res) => {
  res.json({ humidity: [ Number((Math.random() * 100 + 400).toFixed()) ] });
});

app.listen(PORT, () => console.log('Fake Arduino listening at http://localhost:' + PORT));

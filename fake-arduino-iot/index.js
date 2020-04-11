const cors = require('cors');
const express = require('express');

const PORT = 80;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/temperature', (req, res) => {
  res.json({ temperature: Number((Math.random() * 100 + 400).toFixed()) });
});

app.get('/humidity', (req, res) => {
  res.json({ humidity: Number((Math.random() * 100 + 400).toFixed()) });
});

app.listen(PORT, () => console.log('Fake Arduino at http://localhost:' + PORT));

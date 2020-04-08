const cors = require('cors');
const express = require('express');

const { ARDUINO_IP, PORT } = require('./constants/constants');
const app = express();

console.log(`Using ${process.env.ARDUINO_IP ? '' : 'Fake-'}Arduino at: ${ARDUINO_IP}`);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/temperature.routes'));

app.listen(PORT, () => console.log('temperature-ms at http://localhost:' + PORT));

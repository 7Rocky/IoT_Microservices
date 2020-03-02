const cors = require('cors');
const express = require('express');

const { ARDUINO, PORT } = require('./constants/constants');
const app = express();

console.log(`Using ${process.env.ARDUINO ? '' : 'Fake-'}Arduino at: ${ARDUINO}`);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/routes'));

app.listen(PORT, () => console.log('temperature-ms at http://localhost:' + PORT));

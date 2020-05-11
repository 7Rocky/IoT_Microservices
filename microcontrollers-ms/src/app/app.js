const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/microcontrollers.routes'));

app.disable('x-powered-by');

module.exports = app;

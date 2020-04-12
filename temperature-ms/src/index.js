const cors = require('cors');
const express = require('express');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/temperature.routes'));

app.disable('x-powered-by');

app.listen(PORT, () => console.log('temperature-ms at http://localhost:' + PORT));

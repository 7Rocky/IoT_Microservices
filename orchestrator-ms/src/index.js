const cors = require('cors');
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/routes'));

app.listen(PORT, () => console.log('orchestrator-ms listening at http://localhost:' + PORT));

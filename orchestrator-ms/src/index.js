const cors = require('cors');
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/orchestrator.routes'));

app.disable('x-powered-by');

app.listen(PORT, () => console.log('orchestrator-ms at http://localhost:' + PORT));

const axios = require('axios');

const getIndex = (req, res) => {
  const { host, path, port } = req.query;
  const url = `http://${host}:${port || 80}${path || '/'}`;

  console.log(url);

  if (host) {
    axios.get(url)
      .then(response => res.json(response.data))
      .catch(error => console.log(error));
  } else {
    res.json({ message: 'No host provided', env: process.env });
  }
};

module.exports = {
  getIndex
};

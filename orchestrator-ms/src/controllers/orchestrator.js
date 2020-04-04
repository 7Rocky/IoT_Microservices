const axios = require('axios');

const getIndex = async (req, res) => {
  const { host, path, port } = req.query;
  const url = `http://${host}:${port || 80}${path || '/'}`;

  console.log(url);

  if (host) {
    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ message: 'No host provided', env: process.env });
  }
};

module.exports = {
  getIndex
};

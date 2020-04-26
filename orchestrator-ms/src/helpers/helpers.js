const crypto = require('crypto');

const isValidIpAddress = ip => {
  return !!ip.match(
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/m
  );
};

const hashPassword = password => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const isValidMicrocontroller = micro => {
  return micro.ip &&
    isValidIpAddress(micro.ip.trim()) &&
    micro.measure &&
    micro.sensor &&
    micro.username;
};

module.exports = {
  hashPassword,
  isValidMicrocontroller
};

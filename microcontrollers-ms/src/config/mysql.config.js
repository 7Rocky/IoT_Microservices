const MYSQL_HOST = process.env.MYSQL_HOSTNAME || '192.168.1.222' // '192.168.99.100'
const MYSQL_PORT = process.env.MYSQL_SERVICE_PORT || 31000

module.exports = {
  DB_NAME: process.env.MYSQL_DATABASE_NAME || 'iot',
  MYSQL: `${MYSQL_HOST}:${MYSQL_PORT}`,
  PASSWORD: process.env.MYSQL_ROOT_PASSWORD || 'my-secret-pw',
  USERNAME: process.env.MYSQL_ROOT_USERNAME || 'root'
}

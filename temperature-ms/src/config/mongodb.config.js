const MONGO_HOST = process.env.MONGO_HOSTNAME || '192.168.1.222' // '192.168.99.100'
const MONGO_PORT = process.env.MONGO_SERVICE_PORT || 32000

module.exports = {
  DB_NAME: process.env.MONGO_DATABASE_NAME || 'iot',
  MONGO: `${MONGO_HOST}:${MONGO_PORT}`,
  PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD || 'secret',
  USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME || 'root'
}

const mysql = require('mysql')

const { DB_NAME, MYSQL, PASSWORD, USERNAME } = require('../config/mysql.config')

const abstractQuery = (db, query, values=[]) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results) => {
      error ? reject(error) : resolve(results)
    })
  })
}

module.exports = class Mysql {

  constructor() {
    this.connect()
  }

  connect() {
    this.db = mysql.createConnection(`mysql://${USERNAME}:${PASSWORD}@${MYSQL}/${DB_NAME}`)

    this.db.connect(error => {
      if (error) {
        console.log('Error when connecting to db:', error)
        setTimeout(handleDisconnect, 2000)
      }
    })

    this.db.on('error', error => {
      if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        this.connect()
      } else {
        throw error
      }
    })
  }

  query(query, values) {
    return abstractQuery(this.db, query, values)
  }

  findByMeasure(measure) {
    return this.query(
      'SELECT * FROM microcontrollers WHERE measure = ?',
      [ measure ]
    )
  }

  findByUsername(username) {
    return this.query(
      'SELECT * FROM microcontrollers WHERE username = ?',
      [ username ]
    )
  }

  async insertMicrocontroller({ ip, measure, sensor, username }) {
    const result = await this.query(
      'INSERT INTO microcontrollers(ip, measure, sensor, username) VALUES (?, ?, ?, ?)',
      [ ip, measure, sensor, username ]
    )
    return !!result.affectedRows
  }

  async updateMicrocontroller({ ip, measure, old_ip, sensor, username }) {
    const result = await this.query(
      'UPDATE microcontrollers SET ip = ?, measure = ?, sensor = ?, username = ? WHERE ip = ? AND measure = ?', 
      [ ip, measure, sensor, username, old_ip, measure ]
    )
    return !!result.affectedRows
  }

  async deleteMicrocontroller({ ip, measure }) {
    const result = await this.query(
      'DELETE FROM microcontrollers WHERE ip = ? AND measure = ?',
      [ ip, measure ]
    )
    return !!result.affectedRows
  }

}

const mysql = require('mysql');

const { DB_NAME, MYSQL, PASSWORD, USERNAME } = require('../config/mysql.config');

const query = (db, query, values) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results) => {
      error ? reject(error) : resolve(results);
    });
  });
};

module.exports = class Mysql {

  constructor() {
    this.db = mysql.createConnection(`mysql://${USERNAME}:${PASSWORD}@${MYSQL}/${DB_NAME}`);
  }

  findByMeasure(measure) {
    return query(
      this.db,
      'SELECT * FROM microcontrollers WHERE measure = ?',
      [ measure ]
    );
  }

  async insertMicrocontroller({ ip, measure, sensor, username }) {
    const result = await query(
      this.db,
      'INSERT INTO microcontrollers VALUES (?, ?, ?, ?)',
      [ ip, measure, sensor, username ]
    );
    return !!result.affectedRows;
  }

  async updateMicrocontroller({ ip, measure, old_ip, old_measure, sensor, username }) {
    const result = await query(
      this.db,
      'UPDATE microcontrollers SET ip = ?, measure = ?, sensor = ?, username = ? WHERE ip = ? AND measure = ?', 
      [ ip, measure, sensor, username, old_ip, old_measure ]
    );
    return !!result.affectedRows;
  }

  async deleteMicrocontroller({ ip, measure }) {
    const result = await query(
      this.db,
      'DELETE FROM microcontrollers WHERE ip = ? AND measure = ?',
      [ ip, measure ]
    );
    return !!result.affectedRows;
  }

};
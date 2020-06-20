const microcontrollers = require('../microcontrollers.json')

module.exports = {
  createConnection: url => {
    return {
      query: (query, values, cb) => {
        if (query === 'SELECT * FROM microcontrollers WHERE measure = ?') {
          const [ measure ] = values
          cb(null, microcontrollers.filter(micro => micro.measure === measure))
        } else if (query === 'SELECT * FROM microcontrollers WHERE username = ?') {
          const [ username ] = values
          cb(null, microcontrollers.filter(micro => micro.username === username))
        } else if (query === 'INSERT INTO microcontrollers(ip, measure, sensor, username) VALUES (?, ?, ?, ?)') {
          const exists = microcontrollers.some(micro => {
            return JSON.stringify(Object.values(micro).sort()) === JSON.stringify(values.sort())
          })
          cb(null, { affectedRows: exists ? 0 : 1 })
        } else if (query === 'UPDATE microcontrollers SET ip = ?, measure = ?, sensor = ?, username = ? WHERE ip = ? AND measure = ?') {
          const [ ip, measure, sensor, username, old_ip ] = values
          const updatedMicro = [ measure, old_ip, sensor, username ]

          const exists = microcontrollers.some(micro => {
            return JSON.stringify(Object.values(micro).sort()) === JSON.stringify(updatedMicro.sort())
          })

          cb(null, { affectedRows: exists ? 1 : 0 })
        } else if (query === 'DELETE FROM microcontrollers WHERE ip = ? AND measure = ?') {
          const [ ip, measure ] = values

          cb(null, {
            affectedRows: microcontrollers.filter(micro => {
              return micro.ip === ip && micro.measure === measure
            }).length === 1 ? 1 : 0
          })
        }
      }
    }
  }
}

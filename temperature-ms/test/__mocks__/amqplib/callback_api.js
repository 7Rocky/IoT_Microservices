let sent = false

module.exports = {
  sent: () => sent,
  connect: (url, cb) => {
    const error = null
    const conn = {
      close: () => { },
      createConfirmChannel: cb => {
        const error = null
        const ch = {
          on: (operation, cb) => { },
          publish: (exchange, routingKey, content, options, cb) => {
            sent = true
            const error = null
            const ok = true
            cb(error, ok)
          }
        }

        cb(error, ch)
      },
      on: (operation, cb) => { }
    }

    cb(error, conn)
  }
}

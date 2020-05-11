const PORT = process.env.PORT || 6000
const app = require('./app/app')

app.listen(PORT, () => {
  console.log('microcontrollers-ms at http://localhost:' + PORT)
})

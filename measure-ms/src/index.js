const PORT = process.env.PORT || 4000
const app = require('./app/app')

app.listen(PORT, () => {
  console.log('measure-ms at http://localhost:' + PORT)
})

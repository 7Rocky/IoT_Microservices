const PORT = process.env.PORT || 4000
const app = require('./app/app')

app.listen(PORT, () => {
  console.log('temperature-ms at http://localhost:' + PORT)
})

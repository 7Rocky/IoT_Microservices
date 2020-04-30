const randomArduinoValue = () => Number((Math.random() * 100 + 400).toFixed())

module.exports = class Controller {

  getHumidity(req, res) {
    return res.json({ humidity: randomArduinoValue() })
  }

  getTemperature(req, res) {
    return res.json({ temperature: randomArduinoValue() })
  }

}

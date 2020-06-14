const randomArduinoValue = () => Number((Math.random() * 100 + 400).toFixed())
const switchLight = status => status === 'on' ? 1 : 0

module.exports = class Controller {

  constructor() {
    this.light = 0
  }

  getHumidity = (req, res) => {
    return res.json({ humidity: randomArduinoValue() })
  }

  getLight = (req, res) => {
    return res.json({ light: this.light })
  }

  getTemperature = (req, res) => {
    return res.json({ temperature: randomArduinoValue() })
  }

  postLight = (req, res) => {
    this.light = switchLight(req.params.status)
    return res.json({ light: this.light })
  }

}

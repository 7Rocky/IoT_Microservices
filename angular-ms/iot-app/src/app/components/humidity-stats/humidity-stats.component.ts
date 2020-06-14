import { Component, OnInit } from '@angular/core'

import { Humidity } from '@models/humidity.model'

@Component({
  selector: 'app-humidity-stats',
  styleUrls: [ './humidity-stats.component.less' ],
  templateUrl: './humidity-stats.component.html'
})
export class HumidityStatsComponent implements OnInit {

  nSamples = 0
  lastHumidity: Humidity
  maxHumidity: Humidity
  minHumidity: Humidity
  avgHumidity = 0

  constructor() { }

  ngOnInit() { }

  newMeasure(humidity: Humidity) {
    this.nSamples++
    this.avgHumidity = Number(
      ((this.avgHumidity * (this.nSamples - 1) + humidity.real_value) / this.nSamples).toFixed(1)
    )

    if (this.lastHumidity && this.maxHumidity && this.minHumidity) {
      this.lastHumidity = humidity
      this.maxHumidity = humidity.real_value > this.maxHumidity.real_value ?
        humidity : this.maxHumidity
      this.minHumidity = humidity.real_value < this.minHumidity.real_value ?
        humidity : this.minHumidity
    } else {
      this.lastHumidity = humidity
      this.maxHumidity = humidity
      this.minHumidity = humidity
    }
  }

}

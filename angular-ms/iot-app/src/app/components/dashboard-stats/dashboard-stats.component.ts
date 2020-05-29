import { Component, OnInit } from '@angular/core'

import { Temperature } from '@models/temperature.model'

@Component({
  selector: 'app-dashboard-stats',
  styleUrls: [ './dashboard-stats.component.less' ],
  templateUrl: './dashboard-stats.component.html'
})
export class DashboardStatsComponent implements OnInit {

  nSamples: number = 0
  lastTemperature: Temperature
  maxTemperature: Temperature
  minTemperature: Temperature
  avgTemperature: number = 0

  constructor() { }

  ngOnInit() {

  }

  newMeasure(temperature: Temperature) {
    this.nSamples++
    this.avgTemperature = Number(
      ((this.avgTemperature * (this.nSamples - 1) + temperature.real_value) / this.nSamples).toFixed(1)
    )

    if (this.lastTemperature && this.maxTemperature && this.minTemperature) {
      this.lastTemperature = temperature
      this.maxTemperature = temperature.real_value > this.maxTemperature.real_value ?
        temperature : this.maxTemperature
      this.minTemperature = temperature.real_value < this.minTemperature.real_value ?
        temperature : this.minTemperature
    } else {
      this.lastTemperature = temperature
      this.maxTemperature = temperature
      this.minTemperature = temperature
    }
  }

}

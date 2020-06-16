import { Component } from '@angular/core'

import { ArduinoService } from '@services/arduino.service'

import { Humidity } from '@models/humidity.model'
import { MeasureChart } from '@shared/measure-chart.class'

@Component({
  selector: 'app-humidity-chart',
  styleUrls: [ './humidity-chart.component.less' ],
  templateUrl: './humidity-chart.component.html'
})
export class HumidityChartComponent extends MeasureChart {

  lastHumidity = -1
  displayedColumns: string[] = [ 'status', 'min', 'max' ]
  dataSource: { status: string, min: number, max: number }[] = [
    { status: 'Seco', min: 0.0, max: 31.6 },
    { status: 'Húmedo', min: 31.6, max: 73.7 },
    { status: 'Mojado', min: 73.7, max: 100.0 }
  ]

  constructor(
    private arduinoService: ArduinoService
  ) {
    super('Humedad', 'Gauge')
  }

  async getCurrentMeasure(isFirstTime: boolean) {
    const humidity = await this.arduinoService.getCurrentMeasure(this.micro.ip, this.micro.measure) as Humidity

    if (humidity) {
      this.lastHumidity = humidity.real_value
      this.handleMeasure(humidity, isFirstTime)
    } else if (!this.micro.isInactive) {
      this.setInactivity(true)
    }
  }

  drawData(humidity: Humidity) {
    if (this.chart.dataTable.length === 2) {
      this.chart.dataTable.pop()
    }

    this.chart.dataTable.push([ new Date(humidity.date).toLocaleTimeString(), humidity.real_value ])
    this.chart.component?.draw()
  }

}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces'

import { ArduinoService } from '@services/arduino.service'

import { Microcontroller } from '@models/microcontroller.model'
import { Humidity } from '@models/humidity.model'

const ELEMENT_DATA: { status: string, min: number, max: number }[] = [
  { status: 'Seco', min: 0.0, max: 31.6 },
  { status: 'Húmedo', min: 31.6, max: 73.7 },
  { status: 'Mojado', min: 73.7, max: 100.0 }
]

@Component({
  selector: 'app-humidity-chart',
  styleUrls: [ './humidity-chart.component.less' ],
  templateUrl: './humidity-chart.component.html'
})
export class HumidityChartComponent implements OnInit, OnDestroy {

  @Input() micro: Microcontroller
  @Output() inactivity = new EventEmitter<Microcontroller>()
  @Output() measure = new EventEmitter<Humidity>()

  chart: GoogleChartInterface = { chartType: 'Gauge' }
  header: string[] = [ 'Tiempo', 'Humedad' ]
  isChartReady = false
  refresh_time = 10000
  interval: any
  lastHumidity: any = -1

  displayedColumns: string[] = ['status', 'min', 'max']
  dataSource = ELEMENT_DATA

  constructor(
    private arduinoService: ArduinoService
  ) { }

  async ngOnInit() {
    const humidity: Humidity = await this.arduinoService.getCurrentMeasure(this.micro.ip, this.micro.measure) as Humidity

    if (humidity) {
      this.lastHumidity = humidity.real_value
      this.chart.dataTable = [
        this.header,
        [ new Date(humidity.date).toLocaleTimeString(), humidity.real_value ]
      ]

      this.measure.emit(humidity)

      this.chart.component?.draw()
      this.isChartReady = true

      this.interval = setInterval(() => this.getCurrentHumidity(), this.refresh_time)
    } else {
      console.log('inactive')
      this.setInactivity(true)
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

  async getCurrentHumidity() {
    const humidity = await this.arduinoService.getCurrentMeasure(this.micro.ip, this.micro.measure) as Humidity

    if (humidity) {
      this.lastHumidity = humidity.real_value

      if (this.micro.isInactive) {
        this.setInactivity(false)
      }

      this.measure.emit(humidity)

      if (this.chart.dataTable.length === 2) {
        this.chart.dataTable.pop()
      }

      this.chart.dataTable.push([ new Date(humidity.date).toLocaleTimeString(), humidity.real_value ])

      if (this.chart) {
        this.chart.component?.draw()
      }
    } else if (!this.micro.isInactive) {
      this.setInactivity(true)
    }
  }

  private setInactivity(isInactive: boolean) {
    this.micro.isInactive = isInactive
    this.inactivity.emit(this.micro)
  }

}

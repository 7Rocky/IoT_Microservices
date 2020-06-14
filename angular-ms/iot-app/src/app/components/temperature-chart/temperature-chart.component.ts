import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces'

import { ArduinoService } from '@services/arduino.service'

import { Microcontroller } from '@models/microcontroller.model'
import { Temperature } from '@models/temperature.model'

@Component({
  selector: 'app-temperature-chart',
  styleUrls: [ './temperature-chart.component.less' ],
  templateUrl: './temperature-chart.component.html'
})
export class TemperatureChartComponent implements OnDestroy, OnInit {

  @Input() micro: Microcontroller
  @Output() inactivity = new EventEmitter<Microcontroller>()
  @Output() measure = new EventEmitter<Temperature>()

  H_AXIS_MAX = 10
  chart: GoogleChartInterface = {
    chartType: 'AreaChart',
    options: {
      hAxis: {
        viewWindow: {
          max: this.H_AXIS_MAX
        }
      },
      legend: {
        alignment: 'end',
        position: 'top'
      }
    }
  }
  header: string[] = [ 'Tiempo', 'Temperatura' ]
  isChartReady = false
  refresh_time = 10000
  interval: any

  constructor(
    private arduinoService: ArduinoService
  ) { }

  async ngOnInit() {
    console.log(this.micro)
    const temperature = await this.arduinoService.getCurrentMeasure(this.micro.ip, this.micro.measure) as Temperature

    if (temperature) {
      this.chart.dataTable = [
        this.header,
        [ new Date(temperature.date).toLocaleTimeString(), temperature.real_value ]
      ]

      this.measure.emit(temperature)

      this.chart.component?.draw()
      this.isChartReady = true

      this.interval = setInterval(() => this.getCurrentTemperature(), this.refresh_time)
    } else {
      this.setInactivity(true)
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

  async getCurrentTemperature() {
    const temperature = await this.arduinoService.getCurrentMeasure(this.micro.ip, this.micro.measure) as Temperature

    if (temperature) {
      if (this.micro.isInactive) {
        this.setInactivity(false)
      }

      this.measure.emit(temperature)

      if (this.chart.dataTable.length === this.H_AXIS_MAX + 1) {
        this.chart.dataTable.shift()
        this.chart.dataTable.shift()
        this.chart.dataTable.unshift(this.header)
      }

      this.chart.dataTable.push([ new Date(temperature.date).toLocaleTimeString(), temperature.real_value ])

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

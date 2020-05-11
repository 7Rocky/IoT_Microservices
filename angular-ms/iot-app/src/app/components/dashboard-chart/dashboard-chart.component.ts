import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces'

import { ArduinoService } from '@services/arduino.service'

import { Microcontroller } from '@models/microcontroller.model'
import { Temperature } from '@models/temperature.model'

@Component({
  selector: 'app-dashboard-chart',
  styleUrls: [ './dashboard-chart.component.less' ],
  templateUrl: './dashboard-chart.component.html'
})
export class DashboardChartComponent implements OnDestroy, OnInit {

  H_AXIS_MAX = 10
  header: string[] = [ 'Tiempo', 'Temperatura' ]
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
  @Input() micro: Microcontroller
  @Output() inactivity = new EventEmitter<Microcontroller>()
  isChartReady = false
  stats: {
    lastTemperature: Temperature,
    maxTemperature: Temperature,
    minTemperature: Temperature,
    avgTemperature: number
  } = {
    lastTemperature: null,
    maxTemperature: null,
    minTemperature: null,
    avgTemperature: 0
  }
  nSamples = 1
  refresh_time = 10000
  interval: any

  constructor(
    private arduinoService: ArduinoService
  ) { }

  async ngOnInit() {
    const temperature = await this.arduinoService.getCurrentTemperature(this.micro.ip, this.micro.measure)

    if (temperature) {
      this.chart.dataTable = [
        this.header,
        [ new Date(temperature.date).toLocaleTimeString(), temperature.real_value ]
      ]

      this.stats.lastTemperature = temperature
      this.stats.maxTemperature = temperature
      this.stats.minTemperature = temperature
      this.stats.avgTemperature = temperature.real_value

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
    const temperature = await this.arduinoService.getCurrentTemperature(this.micro.ip, this.micro.measure)

    if (temperature) {
      if (this.micro.isInactive) {
        this.setInactivity(false)
      }

      this.setStats(temperature)

      if (this.chart.dataTable.length === this.H_AXIS_MAX + 1) {
        this.chart.dataTable.shift()
        this.chart.dataTable.shift()
        this.chart.dataTable.unshift(this.header)
      }

      this.chart.dataTable.push([ new Date(temperature.date).toLocaleTimeString(), temperature.real_value ])

      if (this.chart) {
        this.chart.component.draw()
      }
    } else if (!this.micro.isInactive) {
      this.setInactivity(true)
    }
  }

  private setInactivity(isInactive: boolean) {
    this.micro.isInactive = isInactive
    this.inactivity.emit(this.micro)
  }

  private setStats(temperature: Temperature) {
    this.nSamples++
    this.stats.avgTemperature = Number(
      ((this.stats.avgTemperature * (this.nSamples - 1) + temperature.real_value) / this.nSamples).toFixed(1)
    )
    this.stats.lastTemperature = temperature
    this.stats.maxTemperature = temperature.real_value > this.stats.maxTemperature.real_value ?
      temperature : this.stats.maxTemperature
    this.stats.minTemperature = temperature.real_value < this.stats.minTemperature.real_value ?
      temperature : this.stats.minTemperature
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces'

import { ArduinoService } from '@services/arduino.service'

import { Light } from '@models/light.model'
import { Microcontroller } from '@models/microcontroller.model'

@Component({
  selector: 'app-light-chart',
  styleUrls: [ './light-chart.component.less' ],
  templateUrl: './light-chart.component.html'
})
export class LightChartComponent implements OnInit {

  @Input() micro: Microcontroller
  @Output() inactivity = new EventEmitter<Microcontroller>()
  @Output() measure = new EventEmitter<Light>()

  chart: GoogleChartInterface = { chartType: 'Gauge' }
  header: string[] = [ 'Tiempo', 'Humedad' ]
  isChartReady = false
  refresh_time = 10000
  interval: any
  lastHumidity = -1
  lightStatus = 'unknown'
  disabledBtn = true

  constructor(
    private arduinoService: ArduinoService
  ) { }

  async ngOnInit() {
    const lightMeasure = await this.arduinoService.getCurrentMeasure(this.micro.ip, this.micro.measure) as Light

    if (lightMeasure) {
      this.disabledBtn = false
      this.lightStatus = lightMeasure.digital_value ? 'on' : 'off'

      this.measure.emit(lightMeasure)

      this.interval = setInterval(() => this.getCurrentLight(), this.refresh_time)
    } else {
      this.lightStatus = 'unknown'
      this.setInactivity(true)
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

  isLightOn(): boolean {
    return this.lightStatus === 'on'
  }

  async getCurrentLight() {
    const lightMeasure = await this.arduinoService.getCurrentMeasure(this.micro.ip, this.micro.measure) as Light

    if (lightMeasure) {
      if (this.micro.isInactive) {
        this.setInactivity(false)
      }

      this.disabledBtn = false
      this.lightStatus = lightMeasure.digital_value ? 'on' : 'off'

      this.measure.emit(lightMeasure)
    } else {
      this.lightStatus = 'unknown'
      this.setInactivity(true)
    }
  }

  private setInactivity(isInactive: boolean) {
    this.micro.isInactive = isInactive
    this.inactivity.emit(this.micro)
  }

  async slideChange(state: boolean) {
    this.disabledBtn = true
    const lightMeasure = await this.arduinoService.postLightStatus(this.micro.ip, state ? 'on' : 'off')
    this.lightStatus = lightMeasure.digital_value ? 'on' : 'off'
    this.disabledBtn = false
  }

}

import { Component } from '@angular/core'

import { ArduinoService } from '@services/arduino.service'

import { Light } from '@models/light.model'

import { MeasureChart } from '@shared/measure-chart.class'

@Component({
  selector: 'app-light-chart',
  styleUrls: [ './light-chart.component.less' ],
  templateUrl: './light-chart.component.html'
})
export class LightChartComponent extends MeasureChart {

  lightStatus = 'unknown'
  disabledBtn = true

  constructor(
    private arduinoService: ArduinoService
  ) {
    super('Light')
  }

  async getCurrentMeasure(isFirstTime: boolean) {
    const light = await this.arduinoService.getCurrentMeasure(this.micro.ip, this.micro.measure) as Light

    if (light) {
      this.handleMeasure(light, isFirstTime)
    } else if (!this.micro.isInactive) {
      this.lightStatus = 'unknown'
      this.disabledBtn = true
      this.setInactivity(true)
    }
  }

  drawData(light: Light) {
    this.disabledBtn = false
    this.lightStatus = light.digital_value ? 'on' : 'off'
  }

  async slideChange(state: boolean) {
    this.disabledBtn = true
    const light = await this.arduinoService.postLightStatus(this.micro.ip, state ? 'on' : 'off')
    this.lightStatus = light.digital_value ? 'on' : 'off'
    this.disabledBtn = false
  }

  isLightOn(): boolean {
    return this.lightStatus === 'on'
  }

}

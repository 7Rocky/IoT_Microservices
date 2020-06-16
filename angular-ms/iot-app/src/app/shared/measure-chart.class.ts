import { EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces'

import { Microcontroller } from '@models/microcontroller.model'

import { Measure } from '@alias/measure.type'

export abstract class MeasureChart implements OnDestroy, OnInit {

  @Input() micro: Microcontroller
  @Output() inactivity = new EventEmitter<Microcontroller>()
  @Output() measure = new EventEmitter<Measure>()

  chart: GoogleChartInterface
  header: string[]
  interval: NodeJS.Timeout
  isChartReady = false
  refresh_time = 10000

  constructor(measure: string, chartType: string = '') {
    this.header = [ 'Tiempo', measure ]
    this.chart = { chartType, dataTable: [ this.header ] }
  }

  checkInactivity() {
    if (this.micro.isInactive) {
      this.setInactivity(false)
    }
  }

  abstract drawData(measure: Measure): void

  abstract async getCurrentMeasure(isFirstTime: boolean): Promise<void>

  handleMeasure(measure: Measure, isFirstTime: boolean = false) {
    this.drawData(measure)
    this.measure.emit(measure)

    if (isFirstTime) {
      this.interval = setInterval(() => this.getCurrentMeasure(false), this.refresh_time)
      this.isChartReady = true
    } else {
      this.checkInactivity()
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

  async ngOnInit() {
    await this.getCurrentMeasure(true)
  }

  setInactivity(isInactive: boolean): void {
    this.micro.isInactive = isInactive
    this.inactivity.emit(this.micro)
  }

}

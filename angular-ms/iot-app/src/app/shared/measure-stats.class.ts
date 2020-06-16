import { OnInit } from '@angular/core'

import { Humidity } from '@models/humidity.model'
import { Temperature } from '@models/temperature.model'

export type SomeMeasures = Humidity | Temperature

export abstract class MeasureStats implements OnInit {

  avgMeasure = 0
  lastMeasure: SomeMeasures
  maxMeasure: SomeMeasures
  measureUnit: string
  minMeasure: SomeMeasures
  nSamples = 0

  constructor(measureUnit: string) {
    this.measureUnit = measureUnit
  }

  newMeasure(measure: SomeMeasures) {
    this.nSamples++
    this.avgMeasure = Number(
      ((this.avgMeasure * (this.nSamples - 1) + measure.real_value) / this.nSamples).toFixed(1)
    )

    if (this.lastMeasure && this.maxMeasure && this.minMeasure) {
      this.lastMeasure = measure
      this.maxMeasure = measure.real_value > this.maxMeasure.real_value ?
        measure : this.maxMeasure
      this.minMeasure = measure.real_value < this.minMeasure.real_value ?
        measure : this.minMeasure
    } else {
      this.lastMeasure = measure
      this.maxMeasure = measure
      this.minMeasure = measure
    }
  }

  ngOnInit() { }

}

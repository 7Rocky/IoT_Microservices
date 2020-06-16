import { Component } from '@angular/core'

import { MeasureStats } from '@shared/measure-stats.class'

@Component({
  selector: 'app-temperature-stats',
  styleUrls: [ '../../templates/measure-stats.template.less' ],
  templateUrl: '../../templates/measure-stats.template.html'
})
export class TemperatureStatsComponent extends MeasureStats {

  constructor() {
    super('ºC')
  }

}

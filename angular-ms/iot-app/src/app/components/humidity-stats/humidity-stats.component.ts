import { Component } from '@angular/core'

import { MeasureStats } from '@shared/measure-stats.class'

@Component({
  selector: 'app-humidity-stats',
  styleUrls: [ '../../templates/measure-stats.template.less' ],
  templateUrl: '../../templates/measure-stats.template.html'
})
export class HumidityStatsComponent extends MeasureStats {

  constructor() {
    super('%')
  }

}

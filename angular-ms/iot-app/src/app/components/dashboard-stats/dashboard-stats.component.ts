import { Component, Input, OnInit } from '@angular/core'

import { Temperature } from '@models/temperature.model'

@Component({
  selector: 'app-dashboard-stats',
  styleUrls: [ './dashboard-stats.component.less' ],
  templateUrl: './dashboard-stats.component.html'
})
export class DashboardStatsComponent implements OnInit {

  @Input() stats: {
    lastTemperature: Temperature,
    maxTemperature: Temperature,
    minTemperature: Temperature,
    avgTemperature: number
  }

  constructor() {

  }

  ngOnInit() {

  }

}

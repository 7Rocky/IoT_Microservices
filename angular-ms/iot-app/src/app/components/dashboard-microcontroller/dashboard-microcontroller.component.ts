import { Component, Input, OnInit } from '@angular/core'

import { Microcontroller } from '@models/microcontroller.model'

@Component({
  selector: 'app-dashboard-microcontroller',
  styleUrls: [ './dashboard-microcontroller.component.less' ],
  templateUrl: './dashboard-microcontroller.component.html'
})
export class DashboardMicrocontrollerComponent implements OnInit {

  @Input() isHistory: boolean = false
  @Input() micro: Microcontroller

  constructor() { }

  ngOnInit() { }

  getMeasureView(name: string): string {
    const measures: { name: string, view: string }[] = [
      { name: 'humidity', view: 'Humedad' },
      { name: 'light', view: 'Bombilla inteligente' },
      { name: 'temperature', view: 'Temperatura' }
    ]

    return measures.filter(measure => measure.name === name)[0].view
  }

}

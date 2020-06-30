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

}

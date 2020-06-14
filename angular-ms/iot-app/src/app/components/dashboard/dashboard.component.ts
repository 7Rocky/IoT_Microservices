import { Component, OnInit } from '@angular/core'

import { ArduinoService } from '@services/arduino.service'
import { AuthService } from '@services/auth.service'

import { Microcontroller } from '@models/microcontroller.model'

@Component({
  selector: 'app-dashboard',
  styleUrls: [ './dashboard.component.less' ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  microcontrollers: Microcontroller[] = []

  constructor(
    private arduinoService: ArduinoService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.arduinoService.getMicrocontrollers()
      .subscribe(
        (response: Microcontroller[]) => {
          this.microcontrollers = response
          this.microcontrollers.forEach((micro: Microcontroller) => {
            micro.isInactive = false
          })
        },
        () => this.authService.removeTokens()
      )
  }

  changeActivity(micro: Microcontroller) {
    const idx = this.microcontrollers.indexOf(micro)
    this.microcontrollers[idx] = micro
  }

}

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, UrlSegment } from '@angular/router'

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
  measure: String

  constructor(
    private route: ActivatedRoute,
    private arduinoService: ArduinoService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.url
      .subscribe((url: UrlSegment[]) => {
        this.measure = url[1]?.path

        this.arduinoService.getMicrocontrollers()
          .subscribe(
            (response: Microcontroller[]) => {
              this.microcontrollers = response
              this.microcontrollers.forEach((micro: Microcontroller) => {
                micro.isInactive = false
              })

              if (this.measure) {
                this.microcontrollers = this.microcontrollers.filter((micro: Microcontroller) => {
                  return micro.measure === this.measure
                })
              }
            },
            () => this.authService.removeTokens()
          )
      })
  }

  changeActivity(micro: Microcontroller) {
    const idx = this.microcontrollers.indexOf(micro)
    this.microcontrollers[idx] = micro
  }

}

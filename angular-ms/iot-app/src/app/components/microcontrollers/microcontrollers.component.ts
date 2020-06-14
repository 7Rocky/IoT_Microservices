import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { ArduinoService } from '@services/arduino.service'

import { Microcontroller } from '@models/microcontroller.model'

@Component({
  selector: 'app-microcontrollers',
  styleUrls: [ './microcontrollers.component.less' ],
  templateUrl: './microcontrollers.component.html'
})
export class MicrocontrollersComponent implements OnInit {

  microcontrollers: Microcontroller[] = []

  constructor(
    private arduinoService: ArduinoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.arduinoService.getMicrocontrollers()
      .subscribe(microcontrollers => this.microcontrollers = microcontrollers)
  }

  newMicro() {
    this.router.navigateByUrl('/microcontrollers/edit')
  }

}

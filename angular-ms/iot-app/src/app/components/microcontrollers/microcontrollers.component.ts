import { Component, OnInit } from '@angular/core'

import { ArduinoService } from '@services/arduino.service'

import { Microcontroller } from '@models/microcontroller.model'

@Component({
  selector: 'app-microcontrollers',
  styleUrls: [ './microcontrollers.component.less' ],
  templateUrl: './microcontrollers.component.html'
})
export class MicrocontrollersComponent implements OnInit {

  displayedColumns = [ 'measure', 'sensor', 'ip', 'actions' ]
  microcontrollers: Microcontroller[] = []

  constructor(
    private arduinoService: ArduinoService
  ) { }

  ngOnInit() {
    this.arduinoService.getMicrocontrollers()
      .subscribe(microcontrollers => this.microcontrollers = microcontrollers)
  }

  deleteMicrocontroller(micro: Microcontroller) {
    this.arduinoService.deleteMicrocontroller(micro)
      .subscribe(() => {
        this.arduinoService.clearMicrocontrollers()
        this.ngOnInit()
      })
  }

}

import { Component, OnInit } from '@angular/core';

import { ArduinoService } from '@services/arduino.service';

@Component({
  selector: 'app-dashboard',
  styleUrls: [ './dashboard.component.less' ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  microcontrollers = [
    /*{ ip: '192.168.1.50', measure: 'Temperatura', name: 'Arduino', sensor: 'Grove - Temperature' },
    { ip: '192.168.1.222', measure: 'Temperatura', name: 'Fake Arduino', sensor: 'Fake Grove - Temperature' },
    { ip: '192.168.1.39', measure: 'Temperatura', name: 'Fake Arduino 2', sensor: 'Fake Grove - Temperature' }*/
  ];

  constructor(private arduinoService: ArduinoService) { }

  ngOnInit() {
    this.arduinoService.getMicrocontrollers()
      .subscribe(
        response => {
          console.log(response);
          this.microcontrollers = response
        },
        () => console.log('Not authenticated')
      );
  }

}

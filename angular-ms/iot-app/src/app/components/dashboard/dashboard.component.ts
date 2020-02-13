import { Component, OnInit } from '@angular/core';

import { ArduinoService } from '@services/arduino.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  data: any;
  method: string = 'GET';
  url: string = 'http://localhost:4000/prueba';

  constructor(
    private arduinoService: ArduinoService
  ) { }

  ngOnInit() {

  }

  getData() {
    if (this.method === 'GET') {
      this.arduinoService.getData(this.url).subscribe(response => this.data = JSON.stringify(response));
    } else if (this.method === 'POST') {
      this.arduinoService.postData(this.url).subscribe(response => this.data = JSON.stringify(response));
    }
  }
}

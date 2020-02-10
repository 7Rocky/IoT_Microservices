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
    private arduinoSvc: ArduinoService
  ) { }

  ngOnInit() {

  }

  getData() {
    console.log(this.method);
    if (this.method === 'GET') {
      this.arduinoSvc.getData(this.url).subscribe(response => this.data = JSON.stringify(response));
    } else if (this.method === 'POST') {
      this.arduinoSvc.postData(this.url).subscribe(response => this.data = JSON.stringify(response));
    }
  }
}

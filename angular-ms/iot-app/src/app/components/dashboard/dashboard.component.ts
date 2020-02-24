import { Component, OnInit } from '@angular/core';

import { ArduinoService } from '@services/arduino.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  data: any;
  method: string = 'GET';
  url: string = 'http://localhost:4000?path=/temperature';
  chart: GoogleChartInterface = {
    chartType: 'AreaChart',
    dataTable: [
      [ 'Time', 'Temperature' ],
      [ new Date().toLocaleTimeString(), 460 ]
    ],
    options: {
      title: 'Prueba'
    }
  };

  constructor(
    private arduinoService: ArduinoService
  ) { }

  ngOnInit() {

  }

  getData() {
    //setInterval(() => {
      if (this.method === 'GET') {
        this.arduinoService.getData(this.url).subscribe(response => {
          this.chart.dataTable.push([ new Date().toLocaleTimeString(), response.temperature[0] ]);
          this.chart.component.draw();
          this.data = JSON.stringify(response);
        });
      } else if (this.method === 'POST') {
        this.arduinoService.postData(this.url).subscribe(response => this.data = JSON.stringify(response));
      }
   // }, 5000);
  }
}

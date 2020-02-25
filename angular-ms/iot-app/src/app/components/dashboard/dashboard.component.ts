import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

import { ArduinoService } from '@services/arduino.service';

@Component({
  selector: 'app-dashboard',
  styleUrls: [ './dashboard.component.less' ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  H_AXIS_MAX: number = 10;
  chart: GoogleChartInterface = {
    chartType: 'AreaChart',
    dataTable: [
      [ 'Time', 'Temperature' ],
      [ new Date().toLocaleTimeString(), 460 ]
    ],
    options: {
      hAxis: {
        viewWindow: {
          max: this.H_AXIS_MAX
        }
      },
      legend: {
        alignment: 'end',
        position: 'top'
      }
    }
  };

  constructor(
    private arduinoService: ArduinoService
  ) { }

  ngOnInit() {

  }

  getData() {
    this.arduinoService.getData({ host: 'localhost', port : 4000 }).subscribe(response => {
      if (this.chart.dataTable.length === this.H_AXIS_MAX + 1) {
        const headerNames = this.chart.dataTable.shift();
        this.chart.dataTable.shift();
        this.chart.dataTable.unshift(headerNames);
      }

      this.chart.dataTable.push([ new Date().toLocaleTimeString(), response.temperature[0] ]);
      this.chart.component.draw();
    });
  }

}

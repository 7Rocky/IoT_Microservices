import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

import { ArduinoService } from '@services/arduino.service';
import { environment } from 'src/environments/environment';

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

  input: string;

  constructor(
    private arduinoService: ArduinoService
  ) { }

  ngOnInit() {

  }

  getData(n: Number) {
    if (n === 1) {
      this.arduinoService.getData({
        host: environment.production ? 'temperature-ms' : 'localhost',
        port: environment.production ? 80 : 4000
      }).subscribe(response => {
        console.log(response);
        if (this.chart.dataTable.length === this.H_AXIS_MAX + 1) {
          const headerNames = this.chart.dataTable.shift();
          this.chart.dataTable.shift();
          this.chart.dataTable.unshift(headerNames);
        }

        this.chart.dataTable.push([ new Date().toLocaleTimeString(), response.temperature[0] ]);
        this.chart.component.draw();
      });
    } else if (n === 2) {
      this.arduinoService.getData({}).subscribe(response => {
        console.log(response);
      });
    }
  }

  setQuery() {
    console.log(this.input);
    this.arduinoService.setQuery(this.input)
      .subscribe(response => console.log(response));
  }

}

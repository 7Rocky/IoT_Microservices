import { Component, OnInit } from '@angular/core';

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

import { ArduinoService } from '@services/arduino.service';

import { Temperature } from '@models/temperature.model';

@Component({
  selector: 'app-dashboard-chart',
  styleUrls: [ './dashboard-chart.component.less' ],
  templateUrl: './dashboard-chart.component.html'
})
export class DashboardChartComponent implements OnInit {
  H_AXIS_MAX: number = 20;
  header: string[] = [ 'Tiempo', 'Temperatura' ];
  chart: GoogleChartInterface = {
    chartType: 'AreaChart',
    dataTable: [
      this.header,
      [ new Date().toLocaleTimeString(), 24 ]
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

  refresh_time: number = 10000;
  interval: any = setInterval(() => this.getCurrentTemperature(), this.refresh_time);

  constructor(
    private arduinoService: ArduinoService
  ) { }

  ngOnInit() {

  }

  getCurrentTemperature() {
      this.arduinoService.getCurrentTemperature()
        .subscribe((temperature: Temperature) => {
          console.log(temperature);
          if (this.chart.dataTable.length === this.H_AXIS_MAX + 1) {
            this.chart.dataTable.shift();
            this.chart.dataTable.shift();
            this.chart.dataTable.unshift(this.header);
          }

          this.chart.dataTable.push([ new Date().toLocaleTimeString(), temperature.real_value ]);
          this.chart.component.draw();
        });
  }

}

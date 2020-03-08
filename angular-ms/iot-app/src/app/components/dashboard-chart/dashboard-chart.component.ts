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
      [ new Date().toLocaleTimeString(), 24.5 ]
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
  lastTemperature: Temperature = {
    date: new Date().toLocaleTimeString(),
    digital_value: 0,
    real_value: Number((24.5).toFixed(1)),
    timestamp: 0
  };
  maxTemperature: Temperature = {
    date: new Date().toLocaleTimeString(),
    digital_value: 0,
    real_value: Number((24.5).toFixed(1)),
    timestamp: 0
  };
  minTemperature: Temperature = {
    date: new Date().toLocaleTimeString(),
    digital_value: 0,
    real_value: Number((24.5).toFixed(1)),
    timestamp: 0
  };
  avgTemperature: number = Number((24.5).toFixed(1));
  nSamples: number = 1;
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
          temperature.date = this.localizeTemperature(temperature.timestamp)
          this.setStats(temperature);
          if (this.chart.dataTable.length === this.H_AXIS_MAX + 1) {
            this.chart.dataTable.shift();
            this.chart.dataTable.shift();
            this.chart.dataTable.unshift(this.header);
          }

          this.chart.dataTable.push([ temperature.date, temperature.real_value ]);
          this.chart.component.draw();
        });
  }

  private setStats(temperature: Temperature) {
    this.nSamples++;
    this.avgTemperature = Number(((this.avgTemperature * (this.nSamples - 1) + temperature.real_value) / this.nSamples).toFixed(1));
    this.lastTemperature = temperature;
    this.maxTemperature = temperature.real_value > this.maxTemperature.real_value ? temperature : this.maxTemperature;
    this.minTemperature = temperature.real_value < this.minTemperature.real_value ? temperature : this.minTemperature;
  }

  private localizeTemperature(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString()
  }

}

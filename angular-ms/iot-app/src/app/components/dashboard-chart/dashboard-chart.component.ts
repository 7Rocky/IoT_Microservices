import { Component, OnDestroy, OnInit } from '@angular/core';

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

import { ArduinoService } from '@services/arduino.service';

import { Temperature } from '@models/temperature.model';

const initDate: string = new Date().toLocaleTimeString();
const initValue: string = (24.5).toFixed(1);
const initTemperature: Temperature = {
  date: initDate,
  digital_value: 0,
  real_value: +initValue,
  timestamp: 0
};
const localizeTemperature = (timestamp: number): string => {
  return new Date(timestamp).toLocaleTimeString();
}

@Component({
  selector: 'app-dashboard-chart',
  styleUrls: [ './dashboard-chart.component.less' ],
  templateUrl: './dashboard-chart.component.html'
})
export class DashboardChartComponent implements OnDestroy, OnInit {

  H_AXIS_MAX: number = 20;
  header: string[] = [ 'Tiempo', 'Temperatura' ];
  chart: GoogleChartInterface = {
    chartType: 'AreaChart',
    dataTable: [
      this.header,
      [ initDate, +initValue ]
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
  lastTemperature: Temperature = initTemperature;
  maxTemperature: Temperature = initTemperature;
  minTemperature: Temperature = initTemperature;
  avgTemperature: number = +initValue;
  nSamples: number = 1;
  refresh_time: number = 10000;
  interval: any;

  constructor(
    private arduinoService: ArduinoService
  ) { }

  ngOnInit() {
    // this.interval = setInterval(() => this.getCurrentTemperature(), this.refresh_time);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getCurrentTemperature() {
    this.arduinoService.getCurrentTemperature()
      .subscribe((temperature: Temperature) => {
        console.log(temperature);
        temperature.date = localizeTemperature(temperature.timestamp)
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

}

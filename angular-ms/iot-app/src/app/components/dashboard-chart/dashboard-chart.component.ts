import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

import { ArduinoService } from '@services/arduino.service';

import { Microcontroller } from '@models/microcontroller.model';
import { Temperature } from '@models/temperature.model';

@Component({
  selector: 'app-dashboard-chart',
  styleUrls: [ './dashboard-chart.component.less' ],
  templateUrl: './dashboard-chart.component.html'
})
export class DashboardChartComponent implements OnDestroy, OnInit {

  H_AXIS_MAX = 10;
  header: string[] = [ 'Tiempo', 'Temperatura' ];
  chart: GoogleChartInterface = {
    chartType: 'AreaChart',
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
  @Input() micro: Microcontroller;
  @Output() inactivity = new EventEmitter<Microcontroller>();
  isChartReady = false;
  lastTemperature: Temperature;
  maxTemperature: Temperature;
  minTemperature: Temperature;
  avgTemperature: number;
  nSamples = 1;
  refresh_time = 10000;
  interval: any;

  constructor(
    private arduinoService: ArduinoService
  ) { }

  async ngOnInit() {
    const temperature = await this.arduinoService.getCurrentTemperature(this.micro.ip, this.micro.measure);

    if (temperature) {
      this.chart.dataTable = [
        this.header,
        [ new Date(temperature.date).toLocaleTimeString(), temperature.real_value ]
      ];

      this.lastTemperature = temperature;
      this.maxTemperature = temperature;
      this.minTemperature = temperature;
      this.avgTemperature = temperature.real_value;

      this.chart.component?.draw();
      this.isChartReady = true;

      this.interval = setInterval(() => this.getCurrentTemperature(), this.refresh_time);
    } else {
      this.setInactivity(true);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  async getCurrentTemperature() {
    const temperature = await this.arduinoService.getCurrentTemperature(this.micro.ip, this.micro.measure);

    if (temperature) {
      if (this.micro.isInactive) {
        this.setInactivity(false);
      }

      this.setStats(temperature);

      if (this.chart.dataTable.length === this.H_AXIS_MAX + 1) {
        this.chart.dataTable.shift();
        this.chart.dataTable.shift();
        this.chart.dataTable.unshift(this.header);
      }

      this.chart.dataTable.push([ new Date(temperature.date).toLocaleTimeString(), temperature.real_value ]);

      if (this.chart) {
        this.chart.component.draw();
      }
    } else if (!this.micro.isInactive) {
      this.setInactivity(true);
    }
  }

  private setInactivity(isInactive: boolean) {
    this.micro.isInactive = isInactive;
    this.inactivity.emit(this.micro);
  }

  private setStats(temperature: Temperature) {
    this.nSamples++;
    this.avgTemperature = Number(((this.avgTemperature * (this.nSamples - 1) + temperature.real_value) / this.nSamples).toFixed(1));
    this.lastTemperature = temperature;
    this.maxTemperature = temperature.real_value > this.maxTemperature.real_value ? temperature : this.maxTemperature;
    this.minTemperature = temperature.real_value < this.minTemperature.real_value ? temperature : this.minTemperature;
  }

}

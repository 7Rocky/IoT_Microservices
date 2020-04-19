import { Component, OnDestroy, OnInit } from '@angular/core';

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

import { ArduinoService } from '@services/arduino.service';

import { Temperature } from '@models/temperature.model';

@Component({
  selector: 'app-temperature-realtime',
  styleUrls: [ './temperature-realtime.component.less' ],
  templateUrl: './temperature-realtime.component.html'
})
export class TemperatureRealtimeComponent implements OnDestroy, OnInit {
  H_AXIS_MAX: number = 10;
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
  input: string;
  refresh_time: number = 10000;
  interval: any;
  checked: boolean = true;
  refresh_times: number[] = [ 5000, 10000, 30000, 60000 ];

  constructor(private arduinoService: ArduinoService) { }

  async ngOnInit() {
    const temperature: Temperature = await this.arduinoService.getCurrentTemperature('192.168.1.50', 'temperature');
    this.chart.dataTable = [
      this.header,
      [ new Date(temperature.date).toLocaleTimeString(), temperature.real_value ]
    ];
    this.interval = setInterval(() => this.getCurrentTemperature(), this.refresh_time);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  async getCurrentTemperature() {
    const temperature: Temperature = await this.arduinoService.getCurrentTemperature('192.168.1.50', 'temperature');

    if (this.chart.dataTable.length === this.H_AXIS_MAX + 1) {
      this.chart.dataTable.shift();
      this.chart.dataTable.shift();
      this.chart.dataTable.unshift(this.header);
    }

    this.chart.dataTable.push([ new Date(temperature.date).toLocaleTimeString(), temperature.real_value ]);
    this.chart.component.draw();
  }

  checkboxClicked() {
    if (this.checked) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(() => this.getCurrentTemperature(), this.refresh_time);
    }
  }

  selectChanged() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.getCurrentTemperature(), this.refresh_time);
  }

}

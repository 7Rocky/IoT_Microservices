import { Component, OnInit } from '@angular/core';

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

import { ArduinoService } from '@services/arduino.service';

import { Temperature } from '@models/temperature.model';

@Component({
  selector: 'app-temperature-realtime',
  styleUrls: [ './temperature-realtime.component.less' ],
  templateUrl: './temperature-realtime.component.html'
})
export class TemperatureRealtimeComponent implements OnInit {
  H_AXIS_MAX: number = 10;
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
  input: string;
  refresh_time: number = 10000;
  interval: any = setInterval(() => this.getCurrentTemperature(), this.refresh_time);
  checked: boolean = true;
  refresh_times: number[] = [ 5000, 10000, 30000, 60000 ];

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

        this.chart.dataTable.push([ new Date(temperature.date).toLocaleTimeString(), temperature.real_value ]);
        this.chart.component.draw();
      });
  }

  setQuery() {
    console.log(this.input);
    this.arduinoService.setQuery(this.input)
      .subscribe(response => console.log(response));
  }

  checkboxClicked() {
    if (this.checked) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(() => this.getCurrentTemperature(), this.refresh_time);
    }
  }

  getPreviousTemperatures() {
    console.log('getPreviousTemperatures');

    this.arduinoService.getPreviousTemperatures(20)
      .subscribe((temperatures: Temperature[]) => {
        console.log(temperatures);
        this.chart.dataTable = [ this.header ];

        for (const temperature of temperatures) {
          console.log(temperature);
          this.chart.dataTable.push([ temperature.date, temperature.real_value ]);
        }

        this.chart.component.draw();
      });
  }

  selectChanged() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.getCurrentTemperature(), this.refresh_time);
  }

}

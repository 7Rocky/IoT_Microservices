import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

import { ArduinoService } from '@services/arduino.service';

import { Temperature } from '@models/temperature.model';
import { Microcontroller } from '@models/microcontroller.model';

@Component({
  selector: 'app-temperature-realtime',
  styleUrls: [ './temperature-realtime.component.less' ],
  templateUrl: './temperature-realtime.component.html'
})
export class TemperatureRealtimeComponent implements OnDestroy, OnInit {
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
  input: string;
  micro: Microcontroller;
  refresh_time = 10000;
  interval: any;
  checked = true;
  refresh_times: number[] = [ 5000, 10000, 30000, 60000 ];

  constructor(
    private arduinoService: ArduinoService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    const ip = this.route.snapshot.paramMap.get('ip');
    const measure = this.route.snapshot.paramMap.get('measure');

    try {
      this.micro = await this.arduinoService.getMicrocontroller(ip, measure);

      const temperature = await this.arduinoService.getCurrentTemperature(this.micro.ip, this.micro.measure);
      this.chart.dataTable = [
        this.header,
        [ new Date(temperature.date).toLocaleTimeString(), temperature.real_value ]
      ];
      this.interval = setInterval(() => this.getCurrentTemperature(), this.refresh_time);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  async getCurrentTemperature() {
    const temperature = await this.arduinoService.getCurrentTemperature(this.micro.ip, this.micro.measure);

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

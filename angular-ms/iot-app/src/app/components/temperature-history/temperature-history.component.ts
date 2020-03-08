import { Component, OnInit } from '@angular/core';

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

import { ArduinoService } from '@services/arduino.service';

import { Temperature } from '@models/temperature.model';

@Component({
  selector: 'app-temperature-history',
  styleUrls: [ './temperature-history.component.less' ],
  templateUrl: './temperature-history.component.html'
})
export class TemperatureHistoryComponent implements OnInit {
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

  constructor(
    private arduinoService: ArduinoService
  ) { }

  ngOnInit() {

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

}

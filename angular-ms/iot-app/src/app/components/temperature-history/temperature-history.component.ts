import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces'

import { ArduinoService } from '@services/arduino.service'

import { Microcontroller } from '@models/microcontroller.model'
import { TemperatureStats } from '@models/temperature-stats.model'

import { MustBeOrderedDates } from '@helpers/must-be-ordered-dates.helper'

@Component({
  selector: 'app-temperature-history',
  styleUrls: [ './temperature-history.component.less' ],
  templateUrl: './temperature-history.component.html'
})
export class TemperatureHistoryComponent implements OnInit {

  header: string[] = [ 'Tiempo', 'Temperatura' ]
  options: any = {
    colors: [ 'green' ],
    hAxis: {
      gridlines: {
        units: {
          days: {
            format: [ 'dd MMM' ]
          },
          hours: {
            format: [ "HH 'h'" ]
          }
        }
      },
      minorGridlines: {
        units: {
          hours: {
            format: [ "HH 'h'" ]
          },
        }
      }
    },
    legend: {
      alignment: 'end',
      position: 'top'
    }
  }
  chart: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [
      this.header,
      [ new Date(), 24 ]
    ],
    options: this.options
  }
  micro: Microcontroller
  historyForm: FormGroup
  temperatures: TemperatureStats[] = []
  stat = 'Mean'
  stats = [
    { color: 'blue', isSelected: false, name: 'Min', value: 'min_value' },
    { color: 'green', isSelected: true, name: 'Mean', value: 'mean_value' },
    { color: 'red', isSelected: false, name: 'Max', value: 'max_value' }
  ]
  currentStats: string[] = [ 'mean_value' ]

  constructor(
    private route: ActivatedRoute,
    private arduinoService: ArduinoService,
    private formBuilder: FormBuilder
  ) {
    this.historyForm = this.formBuilder.group(
      {
        init_date: [ new Date(2020, 4, 15), Validators.required ],
        end_date: [ new Date(2020, 4, 22), Validators.required ],
        stats: [ 'Mean' ]
      },
      {
        validator: MustBeOrderedDates('init_date', 'end_date')
      }
    )
  }

  async ngOnInit() {
    const ip = this.route.snapshot.paramMap.get('ip')
    const measure = this.route.snapshot.paramMap.get('measure')

    try {
      this.micro = await this.arduinoService.getMicrocontroller(ip, measure)
    } catch (error) {
      console.log(error)
    }
  }

  selectChanged() {
    for (const stat of this.stats) {
      stat.isSelected = this.currentStats.indexOf(stat.value) !== -1
    }

    this.drawChart(this.temperatures)
  }

  getPreviousTemperatures({ init_date, end_date }) {
    this.arduinoService.getPreviousTemperatures(this.micro.ip, init_date.toJSON(), end_date.toJSON())
      .subscribe((temperatures: TemperatureStats[]) => {
        this.temperatures = temperatures
        this.drawChart(temperatures)
      })
  }

  drawChart(temperatures: TemperatureStats[]) {
    if (temperatures.length) {
      const stats = this.stats.filter(stat => stat.isSelected)
      const names = stats.map(stat => stat.name)
      this.chart.dataTable = [ [ this.header[0], ...names ] ]
      this.options.colors = stats.filter(stat => stat.color)
      this.chart.options = this.options

      temperatures.forEach(temperature => {
        this.chart.dataTable.push([
          new Date(temperature.init_date),
          ...stats.map(stat => temperature[stat.value])
        ])
      })

      this.chart.component.draw()
    } else {
      console.log('¡No hay datos registrados!')
    }
  }

}

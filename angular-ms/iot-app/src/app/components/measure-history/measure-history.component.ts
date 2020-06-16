import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces'

import { ArduinoService } from '@services/arduino.service'

import { HumidityStats } from '@models/humidity-stats.model'
import { LightStats } from '@models/light-stats.model'
import { Microcontroller } from '@models/microcontroller.model'
import { TemperatureStats } from '@models/temperature-stats.model'

import { MustBeOrderedDates } from '@helpers/must-be-ordered-dates.helper'

@Component({
  selector: 'app-measure-history',
  styleUrls: [ './measure-history.component.less' ],
  templateUrl: './measure-history.component.html'
})
export class MeasureHistoryComponent implements OnInit {

  header: string[]
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
    dataTable: [ ],
    options: this.options
  }
  data: HumidityStats[] | LightStats[] | TemperatureStats[] = []
  micro: Microcontroller
  historyForm: FormGroup
  stat = 'Mean'
  stats: { color: string, isSelected: boolean, name: string, value: string }[] = [
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
        init_date: [ new Date(Date.now() - 24 * 60 * 60 * 1000), Validators.required ],
        end_date: [ new Date(), Validators.required ],
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
      this.header = [ 'Tiempo', this.micro.measure ]
      this.chart.dataTable = [ this.header, [ new Date(), 24 ] ]
    } catch (error) { }
  }

  selectChanged() {
    for (const stat of this.stats) {
      stat.isSelected = this.currentStats.indexOf(stat.value) !== -1
    }

    this.drawChart(this.data)
  }

  getPreviousTemperatures({ init_date, end_date }: { init_date: Date, end_date: Date }) {
    this.arduinoService.getPreviousMeasures(
        this.micro.ip,
        this.micro.measure,
        this.makePlural(this.micro.measure),
        init_date.toJSON(),
        end_date.toJSON()
      )
      .subscribe((measures: HumidityStats[] | LightStats[] | TemperatureStats[]) => {
        this.data = measures
        this.drawChart(measures)
      })
  }

  makePlural(word: string) {
    const lastLetterIndex = word.length - 1
    return word[lastLetterIndex] !== 'y' ? `${word}s` : `${word.substring(0, lastLetterIndex)}ies`
  }

  drawChart(measures: HumidityStats[] | LightStats[] | TemperatureStats[]) {
    if (measures.length) {
      const stats = this.stats.filter(stat => stat.isSelected)
      const names = stats.map(stat => stat.name)
      this.chart.dataTable = [ [ this.header[0], ...names ] ]
      this.options.colors = stats.filter(stat => stat.color)
      this.chart.options = this.options

      measures.forEach((measure: HumidityStats | LightStats | TemperatureStats) => {
        this.chart.dataTable.push([
          new Date(measure.init_date),
          ...stats.map(stat => measure[stat.value])
        ])
      })

      this.chart.component.draw()
    } else {
      alert('¡No hay datos registrados!')
    }
  }

}

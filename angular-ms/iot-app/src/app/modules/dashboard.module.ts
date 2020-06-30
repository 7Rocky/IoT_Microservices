import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { Ng2GoogleChartsModule } from 'ng2-google-charts'

import { MatModule } from '@modules/mat.module'
import { PipesModule } from './pipes.module'

import { DashboardRoutingModule } from '@routes/dashboard.routing.module'

import { DashboardComponent } from '@components/dashboard/dashboard.component'
import {
  DashboardMicrocontrollerComponent
} from '@components/dashboard-microcontroller/dashboard-microcontroller.component'
import { HumidityChartComponent } from '@components/humidity-chart/humidity-chart.component'
import { HumidityStatsComponent } from '@components/humidity-stats/humidity-stats.component'
import { LightChartComponent } from '@components/light-chart/light-chart.component'
import { LightStatsComponent } from '@components/light-stats/light-stats.component'
import { MeasureHistoryComponent } from '@components/measure-history/measure-history.component'
import { TemperatureChartComponent } from '@components/temperature-chart/temperature-chart.component'
import { TemperatureStatsComponent } from '@components/temperature-stats/temperature-stats.component'

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMicrocontrollerComponent,
    HumidityChartComponent,
    HumidityStatsComponent,
    LightChartComponent,
    LightStatsComponent,
    MeasureHistoryComponent,
    TemperatureChartComponent,
    TemperatureStatsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatModule,
    Ng2GoogleChartsModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }

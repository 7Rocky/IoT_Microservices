import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { Ng2GoogleChartsModule } from 'ng2-google-charts'

import { DashboardComponent } from '@components/dashboard/dashboard.component'
import { DashboardChartComponent } from '@components/dashboard-chart/dashboard-chart.component'
import { DashboardMicrocontrollerComponent } from '@components/dashboard-microcontroller/dashboard-microcontroller.component'
import { DashboardStatsComponent } from '@components/dashboard-stats/dashboard-stats.component'
import { TemperatureHistoryComponent } from '@components/temperature-history/temperature-history.component'
import { TemperatureRealtimeComponent } from '@components/temperature-realtime/temperature-realtime.component'

import { MatModule } from '@modules/mat.module'

import { DashboardRoutingModule } from '@routes/dashboard.routing.module'

@NgModule({
  declarations: [
    DashboardChartComponent,
    DashboardComponent,
    DashboardMicrocontrollerComponent,
    DashboardStatsComponent,
    TemperatureHistoryComponent,
    TemperatureRealtimeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatModule,
    Ng2GoogleChartsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }

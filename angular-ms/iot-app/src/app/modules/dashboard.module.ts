import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { MatModule } from '@modules/mat.module';

import { DashboardRoutingModule } from '@routes/dashboard.routing.module';

import { DashboardChartComponent } from '@components/dashboard-chart/dashboard-chart.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { TemperatureHistoryComponent } from '@components/temperature-history/temperature-history.component';
import { TemperatureRealtimeComponent } from '@components/temperature-realtime/temperature-realtime.component';

@NgModule({
  declarations: [
    DashboardChartComponent,
    DashboardComponent,
    TemperatureHistoryComponent,
    TemperatureRealtimeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatModule,
    Ng2GoogleChartsModule
  ]
})
export class DashboardModule { }

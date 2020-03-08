import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

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
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    Ng2GoogleChartsModule
  ]
})
export class DashboardModule { }

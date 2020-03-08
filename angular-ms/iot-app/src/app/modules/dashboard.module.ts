import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { DashboardChartComponent } from '@components/dashboard-chart/dashboard-chart.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardChartComponent,
    DashboardComponent
  ],
  exports: [
    DashboardChartComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    Ng2GoogleChartsModule
  ]
})
export class DashboardModule { }

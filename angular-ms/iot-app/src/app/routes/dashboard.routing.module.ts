import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { TemperatureRealtimeComponent } from '@components/temperature-realtime/temperature-realtime.component';
import { TemperatureHistoryComponent } from '@components/temperature-history/temperature-history.component';

const routes: Routes = [
  { component: DashboardComponent, path: '' },
  { component: TemperatureRealtimeComponent, path: 'temperature/realtime' },
  { component: TemperatureHistoryComponent, path: 'temperature/history' }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DashboardRoutingModule { }

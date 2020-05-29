import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from '@guards/auth.guard'

import { DashboardComponent } from '@components/dashboard/dashboard.component'
import { TemperatureRealtimeComponent } from '@components/temperature-realtime/temperature-realtime.component'
import { TemperatureHistoryComponent } from '@components/temperature-history/temperature-history.component'

const routes: Routes = [
  { canActivate: [ AuthGuard ], component: DashboardComponent, path: '' },
  { canActivate: [ AuthGuard ], component: TemperatureRealtimeComponent, path: 'temperature/realtime/:ip/:measure' },
  { canActivate: [ AuthGuard ], component: TemperatureHistoryComponent, path: 'temperature/history/:ip/:measure' }
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DashboardRoutingModule { }

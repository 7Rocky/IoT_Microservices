import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from '@guards/auth.guard'

import { DashboardComponent } from '@components/dashboard/dashboard.component'
import { IndexComponent } from '@components/index/index.component'
import { MicrocontrollersComponent } from '@components/microcontrollers/microcontrollers.component'

const routes: Routes = [
  { canActivate: [ AuthGuard ], component: DashboardComponent, path: 'dashboard' },
  { canActivate: [ AuthGuard ], component: MicrocontrollersComponent, path: 'my-microcontrollers' },
  { component: IndexComponent, path: '' }
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from '@guards/auth.guard'

import { MicrocontrollersComponent } from '@components/microcontrollers/microcontrollers.component'
import { MicrocontrollersEditComponent } from '@components/microcontrollers-edit/microcontrollers-edit.component'

const routes: Routes = [
  { canActivate: [ AuthGuard ], component: MicrocontrollersComponent, path: '' },
  { canActivate: [ AuthGuard ], component: MicrocontrollersEditComponent, path: 'my-microcontrollers/edit/:ip/:measure' },
  { canActivate: [ AuthGuard ], component: MicrocontrollersEditComponent, path: 'my-microcontrollers/edit' }
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MicrocontrollersRoutingModule { }

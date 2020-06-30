import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatModule } from '@modules/mat.module'
import { PipesModule } from './pipes.module'

import { MicrocontrollersRoutingModule } from '@routes/microcontrollers.routing.module'

import { MicrocontrollersComponent } from '@components/microcontrollers/microcontrollers.component'
import { MicrocontrollersEditComponent } from '@components/microcontrollers-edit/microcontrollers-edit.component'

@NgModule({
  declarations: [
    MicrocontrollersComponent,
    MicrocontrollersEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatModule,
    MicrocontrollersRoutingModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class MicrocontrollersModule { }

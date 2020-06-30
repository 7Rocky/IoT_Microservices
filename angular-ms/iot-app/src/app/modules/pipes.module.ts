import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MeasureViewPipe } from '@pipes/measure-view.pipe'

@NgModule({
  declarations: [
    MeasureViewPipe
  ],
  exports: [
    MeasureViewPipe
  ]
})
export class PipesModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { DashboardComponent } from '@components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    Ng2GoogleChartsModule
  ],
  providers: [
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }
  ]
})
export class DashboardModule { }

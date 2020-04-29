import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { IndexComponent } from '@components/index/index.component';

const routes: Routes = [
  { component: DashboardComponent, path: 'dashboard' },
  { component: IndexComponent, path: ''}
];

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

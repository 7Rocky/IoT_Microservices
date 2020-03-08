import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '@components/dashboard/dashboard.component';

const routes: Routes = [
  { component: DashboardComponent, path: 'dashboard' },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

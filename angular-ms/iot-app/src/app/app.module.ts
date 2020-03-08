import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RoutingModule } from '@modules/routing.module';

import { AppComponent } from './app.component';
import { DropdownMenuComponent } from '@components/dropdown-menu/dropdown-menu.component';
import { LoginComponent } from '@components/login/login.component';
import { NavbarComponent } from '@components/navbar/navbar.component';

import { DashboardModule } from '@modules/dashboard.module';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    DropdownMenuComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DashboardModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RoutingModule
  ]
})
export class AppModule { }

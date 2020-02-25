import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { DropdownMenuComponent } from '@components/dropdown-menu/dropdown-menu.component';
import { LoginComponent } from '@components/login/login.component';
import { NavbarComponent } from '@components/navbar/navbar.component';

import { ArduinoService } from '@services/arduino.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DropdownMenuComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    Ng2GoogleChartsModule,
    HttpClientModule
  ],
  providers: [
    ArduinoService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

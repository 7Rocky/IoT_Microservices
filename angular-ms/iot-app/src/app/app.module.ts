import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { MenuComponent } from '@components/menu/menu.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { ArduinoService } from '@services/arduino.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    NavbarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
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

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardModule } from '@modules/dashboard.module';
import { MatModule } from '@modules/mat.module';

import { AppRoutingModule } from '@routes/app-routing.module';

import { AppComponent } from '@components/app/app.component';
import { DropdownMenuComponent } from '@components/dropdown-menu/dropdown-menu.component';
import { LoginComponent } from '@components/login/login.component';
import { NavbarComponent } from '@components/navbar/navbar.component';

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
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DashboardModule,
    FormsModule,
    HttpClientModule,
    MatModule
  ]
})
export class AppModule { }

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
import { LoginDialogComponent } from '@components/login/login-dialog.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { RegisterDialogComponent } from '@components/login/register-dialog.component';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    LoginDialogComponent,
    DropdownMenuComponent,
    LoginComponent,
    NavbarComponent,
    RegisterDialogComponent,
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

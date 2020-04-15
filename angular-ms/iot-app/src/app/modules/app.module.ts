import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AuthInterceptor } from '@interceptors/auth.interceptor';

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
    MatModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor
    }
  ]
})
export class AppModule { }

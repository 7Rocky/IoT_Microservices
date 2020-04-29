import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '@components/app/app.component';
import { IndexComponent } from '@components/index/index.component';
import { LoginComponent } from '@components/login/login.component';
import { LoginDialogComponent } from '@components/login/login-dialog.component';
import { RegisterDialogComponent } from '@components/login/register-dialog.component';
import { NavbarComponent } from '@components/navbar/navbar.component';

import { AuthInterceptor } from '@interceptors/auth.interceptor';

import { DashboardModule } from '@modules/dashboard.module';
import { MatModule } from '@modules/mat.module';

import { AppRoutingModule } from '@routes/app-routing.module';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    LoginDialogComponent,
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
      provide: LOCALE_ID,
      useValue: 'es'
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor
    },
    LoginComponent
  ]
})
export class AppModule { }

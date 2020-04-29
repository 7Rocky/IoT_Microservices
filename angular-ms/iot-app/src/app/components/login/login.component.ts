import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { LoginDialogComponent } from '@components/login/login-dialog.component';
import { RegisterDialogComponent } from '@components/login/register-dialog.component';
import { AuthService } from '@services/auth.service';
import { DropdownMenuOption } from '@shared/dropdown-menu-option';

@Component({
  selector: 'app-login',
  styleUrls: [ './login.component.less' ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy, OnInit {

  dialogConf = { data: { }, width: '500px' };
  dialogRef: any;
  icon: string = 'keyboard_arrow_down';
  isDialogOpen: boolean = false;
  isLogged: boolean;
  options: DropdownMenuOption[] = [
    { link: '/', name: 'Mi perfil' },
    { link: '/', name: 'Configuración' }
  ];
  password: string;
  username: string;
  subs: Subscription;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('iot-ms-user') || '';
    this.isLogged = this.username ? this.authService.isLoggedIn : false;

    this.subs = this.authService.logInAnnounced$
      .subscribe(login => {
        this.isLogged = login;
        this.username = this.authService.username;

        if (login) {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  logout() {
    this.menuClosed();
    this.authService.removeTokens();
    this.username = '';
  }

  menuClosed() {
    this.icon = 'keyboard_arrow_down';
  }

  menuOpened() {
    this.icon = 'keyboard_arrow_up';
  }

  openDialog(): void {
    if (!this.isDialogOpen) {
      this.isDialogOpen = true;
      this.dialogRef = this.dialog.open(LoginDialogComponent, this.dialogConf);
      this.dialogRef.afterClosed()
        .subscribe(this.subscription);
    }
  }

  subscription = (result: string | boolean) => {
    if (result && typeof result === 'string') {
      this.username = result;
      this.isLogged = true;
      this.isDialogOpen = false;
    }

    if (typeof result === 'boolean') {
      this.isDialogOpen = true;

      if (result) {
        this.dialogRef = this.dialog.open(RegisterDialogComponent, this.dialogConf);
      } else {
        this.dialogRef = this.dialog.open(LoginDialogComponent, this.dialogConf);
      }

      this.dialogRef.afterClosed()
        .subscribe(this.subscription);
    }
  }

}

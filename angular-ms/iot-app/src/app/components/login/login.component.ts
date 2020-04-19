import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DropdownMenuOption } from '@shared/dropdown-menu-option';
import { LoginDialogComponent } from './login-dialog.component';
import { RegisterDialogComponent } from './register-dialog.component';

@Component({
  selector: 'app-login',
  styleUrls: [ './login.component.less' ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  dialogConf = { data: { }, width: '500px' };
  dialogRef: any;
  icon: string = 'keyboard_arrow_down';
  isLogged: boolean;
  options: DropdownMenuOption[] = [
    { link: '/', name: 'Mi perfil' },
    { link: '/', name: 'Configuración' }
  ];
  password: string;
  username: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.username = localStorage.getItem('iot-ms-user') || '';
    this.isLogged = !!this.username;
  }

  logout() {
    this.menuClosed();
    localStorage.removeItem('iot-ms-token');
    localStorage.removeItem('iot-ms-user');
    this.isLogged = false;
    this.username = '';
  }

  menuClosed() {
    this.icon = 'keyboard_arrow_down';
  }

  menuOpened() {
    this.icon = 'keyboard_arrow_up';
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(LoginDialogComponent, this.dialogConf);
    this.dialogRef.afterClosed()
      .subscribe(this.subscription);
  }

  subscription = (result: string | boolean) => {
    if (result && typeof result === 'string') {
      this.username = result;
      this.isLogged = true;
    }

    if (typeof result === 'boolean') {
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

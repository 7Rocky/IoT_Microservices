import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login-dialog',
  styleUrls: [ './login.component.less' ],
  templateUrl: './login-dialog.component.html'
})
export class LoginDialogComponent {

  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  login() {
    this.authService.login(this.username, this.password)
      .subscribe((response: { token: string }) => {
        localStorage.setItem('iot-ms-token', response.token);
        localStorage.setItem('iot-ms-user', this.username);
        this.dialogRef.close(this.username);
      },
      () => {
        this.password = '';
      });
  }

  changeToRegister() {
    this.dialogRef.close(true);
  }

}

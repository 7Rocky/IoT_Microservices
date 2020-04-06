import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-register-dialog',
  styleUrls: [ './login.component.less' ],
  templateUrl: './register-dialog.component.html'
})
export class RegisterDialogComponent {

  username: string;
  password: string;
  repeatPassword: string;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterDialogComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  register() {
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

  changeToLogin() {
    this.dialogRef.close(false);
  }

}

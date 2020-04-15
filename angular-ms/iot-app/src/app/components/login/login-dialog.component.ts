import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login-dialog',
  styleUrls: [ './login.component.less' ],
  templateUrl: './login-dialog.component.html'
})
export class LoginDialogComponent {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [ Validators.required ]),
      password: new FormControl('', [ Validators.required ])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  login({ username, password }) {
    console.log('login');
    this.authService.login(username, password)
      .subscribe(
        () => this.dialogRef.close(username),
        () => this.loginForm.get(['password']).reset()
      );
  }

  changeToRegister() {
    this.dialogRef.close(true);
  }

}

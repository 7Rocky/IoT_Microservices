import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '@services/auth.service';
import { MustMatch } from '@helpers/must-match.helper';

@Component({
  selector: 'app-register-dialog',
  styleUrls: [ './login.component.less' ],
  templateUrl: './register-dialog.component.html'
})
export class RegisterDialogComponent {

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: [ '', Validators.required ],
        password: [ '', Validators.required ],
        repeatPassword: [ '', Validators.required ]
      },
      {
        validator: MustMatch('password', 'repeatPassword')
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  register({ username, password, repeatPassword }) {
    if (password === repeatPassword) {
      this.authService.register(username, password)
        .subscribe(
          () => this.dialogRef.close(username),
          () => {
            this.registerForm.get(['password']).reset();
            this.registerForm.get(['repeatPassword']).reset();
          }
        );
    } else {
      this.registerForm.get(['password']).reset();
      this.registerForm.get(['repeatPassword']).reset();
    }
  }

  changeToLogin() {
    this.dialogRef.close(false);
  }

}

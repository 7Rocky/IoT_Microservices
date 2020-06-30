import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'

import { AuthService } from '@services/auth.service'

import { LoginDialogComponent } from '@components/login/login-dialog.component'
import { RegisterDialogComponent } from '@components/login/register-dialog.component'

import { AuthGuard } from '@guards/auth.guard'

@Component({
  selector: 'app-login',
  styleUrls: [ './login.component.less' ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy, OnInit {

  dialogConf = { data: { }, width: '500px' }
  dialogRef: MatDialogRef<LoginDialogComponent | RegisterDialogComponent>
  icon = 'keyboard_arrow_down'
  isDialogOpen = false
  isLogged: boolean
  options: { link: string, name: string }[] = [
    { link: '/dashboard', name: 'Mi dashboard' },
    { link: '/my-microcontrollers', name: 'Mis microcontroladores' }
  ]
  password: string
  username: string
  subs: Subscription

  constructor(
    private authGuard: AuthGuard,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  async ngOnInit() {
    this.username = this.authService.getUser()
    this.isLogged = !!this.username

    this.subs = this.authService.logInAnnounced$
      .subscribe((login: boolean) => {
        this.isLogged = login
        this.username = this.authService.getUser()

        if (login) {
          this.router.navigateByUrl(this.authGuard.getLastUrl())
        } else {
          this.openDialog()
        }
      })
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  logout() {
    this.menuClosed()
    this.authService.removeTokens()
    this.router.navigateByUrl('/')
    this.username = ''
  }

  menuClosed() {
    this.icon = 'keyboard_arrow_down'
  }

  menuOpened() {
    this.icon = 'keyboard_arrow_up'
  }

  openDialog() {
    if (!this.isDialogOpen) {
      this.isDialogOpen = true
      this.dialogRef = this.dialog.open(LoginDialogComponent, this.dialogConf)
      this.dialogRef.afterClosed().subscribe(this.subscription)
    }
  }

  subscription = (result: undefined | string | boolean) => {
    switch (typeof result) {
      case 'undefined':
        this.isDialogOpen = false

        if (!this.isLogged) {
          this.router.navigateByUrl('/')
        }

        break
      case 'string':
        this.username = result
        this.isLogged = true
        this.isDialogOpen = false
        break
      case 'boolean':
        this.isDialogOpen = true

        if (result) {
          this.dialogRef = this.dialog.open(RegisterDialogComponent, this.dialogConf)
        } else {
          this.dialogRef = this.dialog.open(LoginDialogComponent, this.dialogConf)
        }

        this.dialogRef.afterClosed().subscribe(this.subscription)
        break
    }
  }

}

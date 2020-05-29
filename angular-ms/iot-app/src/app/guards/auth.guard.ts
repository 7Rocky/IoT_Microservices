import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router'

import { AuthService } from '@services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const refreshToken = this.authService.getRefreshToken()

    if (this.authService.isLoggedIn()) return true

    if (refreshToken) {
      try {
        await this.authService.refresh().toPromise()
        return true
      } catch (error) { }
    }

    this.authService.removeTokens()
    return false
  }

}

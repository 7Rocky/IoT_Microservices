import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router'

import { AuthService } from '@services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private lastUrl: string

  constructor(
    private authService: AuthService
  ) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const refreshToken = this.authService.getRefreshToken()
    this.setLastUrl(next)

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

  getLastUrl() {
    return this.lastUrl || '/'
  }

  setLastUrl(next: ActivatedRouteSnapshot) {
    this.lastUrl = '/' + next.url.map(url => url.path).join('/')
  }

}

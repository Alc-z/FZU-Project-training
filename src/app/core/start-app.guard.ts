import { PassportService } from './../pages/passport/passport.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_KEY, IS_LAUNCHED } from '../pages/welcome/welcome.page';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router, private passprotService: PassportService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const appConfig: any = this.localStorageService.get(APP_KEY, {
      isLaunched: false,
      version: '1.0.0'
    });

    const isLoginConfig: any = this.localStorageService.get(APP_KEY, {
      hasLogin: false,
      loginTime: Date.now()
    });

    if (appConfig.isLaunched === false) {
      appConfig.isLaunched = true;
      this.localStorageService.set(IS_LAUNCHED, appConfig);
      return true;
    } else {
      const now = new Date(+new Date() - 136 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      if (now < isLoginConfig.time && isLoginConfig.hasLogin === true) {
        this.router.navigateByUrl('home');
        return false;
      } else {
        this.router.navigateByUrl('passport/login');
        return false;
      }
    }
  }
}

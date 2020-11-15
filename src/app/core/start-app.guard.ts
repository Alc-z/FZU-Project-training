import { PassportService } from './../pages/passport/passport.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_KEY } from '../pages/welcome/welcome.page';
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

    if (appConfig.isLaunched === false) {
      appConfig.isLaunched = true;
      this.localStorageService.set(APP_KEY, appConfig);
      return true;
    } else {
      this.router.navigateByUrl('passport/login');
      return false;
    }
  }
}

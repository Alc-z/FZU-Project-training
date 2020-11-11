import { PassportService } from './../passport/passport.service';
import { Router } from '@angular/router';
import { SettingService } from './setting.service';
import { User } from './../passport/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(
    private settingService: SettingService,
    private router: Router,
    private passportService: PassportService
  ) { }

  ngOnInit() {
  }

  get user(): User {
    const user = this.settingService.user;
    console.log('user', user);
    return this.settingService.user;
  }

  onLogout() {
    this.passportService.cleanLog();
    this.router.navigateByUrl('passport/login');
  }

  /**
  * 页面跳转
  */
  goToPage(page: string) {
    this.router.navigateByUrl(page);
  }

}

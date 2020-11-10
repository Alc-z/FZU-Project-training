import { SettingService } from './setting.service';
import { User } from './../passport/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private settingService: SettingService) { }

  ngOnInit() {
  }

  get user(): User{
    const user = this.settingService.user;
    console.log('user', user);
    return this.settingService.user;
  }
}

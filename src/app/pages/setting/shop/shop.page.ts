import { SettingService } from './../setting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  shop: any;
  
  constructor(private settingService: SettingService) { }

  ngOnInit() {
  }

  get user(): any{
    return null;
  }

}

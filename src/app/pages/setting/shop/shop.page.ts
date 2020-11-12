import { User } from './../../passport/user';
import { ShopService } from './shop.service';
import { SettingService } from './../setting.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shop } from './shop';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  shop: Shop;
  id: number;

  constructor(
    private settingService: SettingService,
    private router: Router,
    private shopService: ShopService
  ) {
  }

  ionViewWillEnter() {
    console.log('userxxx', this.user);
    if (this.id > 0) {
      this.settingService.load(this.id);
    }
    // this.settingService.load(this.user.id);

    const shopName = this.user.shopName;
    this.shop = this.shopService.getShop(shopName);
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  get user(): User {
    return this.settingService.user;
  }

  goToPage(page: string) {
    this.router.navigateByUrl(page);
  }
}

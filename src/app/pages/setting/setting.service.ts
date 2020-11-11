import { ShopService } from './shop/shop.service';
import { PassportService } from './../passport/passport.service';
import { User } from './../passport/User';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  user: User;
  constructor(
    private passportService: PassportService,
    private shopService: ShopService
  ) {
    this.load(0);
  }

  // 登入后初始化
  load(userId: number) {
    const userDto = this.passportService.getUser(userId);
    const shopDto = this.shopService.getShop(userDto.shopName);
    this.user = {
      ...userDto,
      ...shopDto
    };
  }
}

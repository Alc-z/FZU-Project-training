import { UserService } from './../passport/user.service';
import { ShopService } from './shop/shop.service';
import { PassportService } from './../passport/passport.service';
import { User } from '../passport/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  user: User;
  constructor(
    private userService: UserService,
    private shopService: ShopService
  ) {
    this.load(0);
    console.log('setting user', this.user);
  }

  // 登入后初始化
  load(userId: number) {
    const userDto = this.userService.getUser(userId);
    const shopDto = this.shopService.getShop(userDto.shopName);
    this.user = {
      ...userDto,
      ...shopDto
    };
  }
}

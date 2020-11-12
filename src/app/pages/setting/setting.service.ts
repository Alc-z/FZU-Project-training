import { UserService } from './../passport/user.service';
import { ShopService } from './shop/shop.service';
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
    this.load(1);
    console.log('setting user', this.user);
  }

  // 1、进入当前页面调用 2、进入到店铺信息页面
  load(userId: number) {
    const userDto = this.userService.getUser(userId);
    const shopDto = this.shopService.getShop(userDto.shopName);
    this.user = {
      ...userDto,
      ...shopDto
    };
  }
}

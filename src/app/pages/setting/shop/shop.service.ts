import { Shop } from './shop';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';

export const T_SHOP = 'TShop';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private localStorageService: LocalStorageService) { }

  getShop(shopName: string): Shop {
    const shops = this.localStorageService.get(T_SHOP, []);

    if (shops.length <= 0) {
      return null;
    }

    for (const s of shops) {
      if (s.shopName === shopName) {
        return s;
      }
    }

    return null;
  }

  addShop(shop: Shop) {
    const shops = this.localStorageService.get(T_SHOP, []);
    shops.push(shop);
    this.localStorageService.set(T_SHOP, shops);
  }

  updateShop(shop: Shop) {
    const shops = this.localStorageService.get(T_SHOP, []);
    for (const item of shops) {
      if (item.shopName === shop.shopName) {
        const index = shops.indexOf(item, 0);
        if (index > -1) {
          shops.splice(index, 1);
        }
        shops.push(shop);
      }
    }

    this.localStorageService.set(T_SHOP, shops);
  }
}

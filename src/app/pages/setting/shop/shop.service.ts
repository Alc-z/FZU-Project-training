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
    return this.localStorageService.get(T_SHOP, {
      shopName: '',
      shortName: '',
      phone: '',
      email: '',
    });
  }

  addShop(shop: Shop) {
    this.localStorageService.set(T_SHOP, shop);
  }
}

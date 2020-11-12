import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Shop {
    shopName: string;
    shortName: string;
    shopKeeperName: string;
    phone: string;
    email: string;
    shopTel: string;
}

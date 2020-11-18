import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Product } from './product';
import {UUID} from 'angular2-uuid';

export const PRODUCT_KEY = 'Product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private localStorageService: LocalStorageService) { }

  async insert(input: Product): Promise<AjaxResult> {
    const res = this.localStorageService.get(PRODUCT_KEY, []);
    input.id = input.id = UUID.UUID();
    res.push(input);
    this.localStorageService.set(PRODUCT_KEY, res);
    return {
      targetUrl: '',
      data: res,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
}

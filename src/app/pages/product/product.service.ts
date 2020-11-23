import { PageData } from './../../shared/class/page-data';
import { AjaxResult } from './../../shared/class/ajax-result';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Product } from './product';
import { UUID } from 'angular2-uuid';

export const PRODUCT_KEY = 'Product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

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

  async getList(index: number, size: number): Promise<AjaxResult> {
    if (index < 0) {
      throw new Error('分页索引小于0');
    }

    if (size <= 0) {
      throw new Error('每页显示的记录数小于0');
    }

    // 取product
    const products: Product[] = this.localStorageService.get(PRODUCT_KEY, []);
    const res = products.slice(index * size, (index + 1) * size);
    const data: PageData = new PageData(products.length, res);
    return new AjaxResult(true, data);
  }


  getListByCategoryId(index: number, size: number, categoryId: number): Promise<AjaxResult> {
    return null;
  }

  getListByCondition(searchProductInput) {

  }
}

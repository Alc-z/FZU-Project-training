import { PageData } from './../../shared/class/page-data';
import { AjaxResult } from './../../shared/class/ajax-result';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Product } from './product';
import { UUID } from 'angular2-uuid';
import { ActiveCategory } from './category/active-category';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { PRODUCTS } from './mock.products';

export const PRODUCT_KEY = 'Product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  categorySubject = new Subject<ActiveCategory>();
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

    const products: Product[] = this.localStorageService.get(PRODUCT_KEY, PRODUCTS);
    const res = products.slice(index * size, (index + 1) * size);
    const data: PageData = new PageData(products.length, res);
    return new AjaxResult(true, data);
  }


  async getListByCategoryId(index: number, size: number, categoryId: number): Promise<AjaxResult> {
    if (index < 0) {
      throw new Error('分页索引小于0');
    }

    if (size <= 0) {
      throw new Error('每页显示的记录数小于0');
    }
    const products: Product[] = this.localStorageService.get(PRODUCT_KEY, PRODUCTS);
    const productList: Product[] = [];
    for (const p of products) {
      if (p.categoryId === categoryId) {
        productList.push(p);
      }
    }
    const res = productList.slice(index * size, (index + 1) * size);
    const data: PageData = new PageData(productList.length, res);
    return new AjaxResult(true, data);
  }

  getListByCondition(index: number, size: number, query: string): PageData {
    const regex = new RegExp(query);
    const pList: Product[] = [];
    const products: Product[] = this.localStorageService.get(PRODUCT_KEY, PRODUCTS);
    products.forEach(product => {
      if (product.name.match(regex)) {
        pList.push(product);
      }
    });
    const res = pList.slice(index * size, (index + 1) * size);
    const data: PageData = new PageData(pList.length, res);
    return data;
  }

  setActiveCategory(activeCategory: ActiveCategory) {
    this.categorySubject.next(activeCategory);
  }

  watchCategory(): Observable<ActiveCategory> {
    return this.categorySubject.asObservable();
  }
}

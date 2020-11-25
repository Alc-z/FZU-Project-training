import { Router } from '@angular/router';
import { ProductService } from './../product/product.service';
import { AjaxResult } from './../../shared/class/ajax-result';
import { Product } from './../product/product';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { timer, Subscription } from 'rxjs';
import { PageData } from 'src/app/shared/class/page-data';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  currentIndex = 0;
  total = -1;
  products: Product[] = [];
  queryTerm = '';
  totalCost: number;
  totalInventory: number;
  subscription: Subscription;
  queryCategoryId: number;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private productService: ProductService,
    private router: Router,
  ) {
    this.subscription = productService.watchCategory().subscribe(
      (activeCategory) => {
        this.queryCategoryId = activeCategory.id;
        this.load(() => { }, 1);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  async ngOnInit() {
    this.currentIndex = 0;
    this.queryCategoryId = 0;

    const loading = await this.loadingController.create({
      message: '正在加载数据，请稍候...',
      spinner: 'bubbles',
    });
    loading.present();
    this.load(() => {
      loading.dismiss();
    }, 1);

  }

  async onReset() {
    this.currentIndex = 0;
    this.queryCategoryId = 0;

    const loading = await this.loadingController.create({
      message: '正在加载数据，请稍候...',
      spinner: 'bubbles',
    });
    loading.present();
    this.load(() => {
      loading.dismiss();
    }, 1);

  }

  /**
   * @param completeFunc
   * @param reflash 1:刷新 0:concat
   */
  private async load(completeFunc: () => void, reflash: number) {
    try {
      let result: AjaxResult;
      if (this.queryCategoryId === 0) {
        result = await this.productService.getList(this.currentIndex, 8);
      } else {
        result = await this.productService.getListByCategoryId(this.currentIndex, 8, this.queryCategoryId);
      }
      const timerSubscription: Subscription = timer(500).subscribe(() => {
        completeFunc();
        this.total = result.data.total;
        this.products = reflash === 1 ? result.data.list : this.products.concat(result.data.list);
        this.getTotalCostAndTotalInventory(this.products);
      });
    } catch (error) {
      console.log(error);
    }
  }

  private getTotalCostAndTotalInventory(products: Product[]) {
    let totalCost = 0;
    let inventory = 0;
    for (const product of products) {
      inventory += product.inventory;
      totalCost += product.purchasePrice * product.inventory;
    }
    this.totalCost = totalCost;
    this.totalInventory = inventory;
  }

  async onRefresh(event: any) {
    this.load(() => {
      event.target.complete();
    }, 1);
  }

  async onInfinite(event: any) {
    this.currentIndex++;
    if (this.currentIndex >= Math.ceil(this.total / 8)) {
      const toast = await this.toastController.create({
        duration: 3000,
        message: '没有数据了'
      });
      toast.present();
      this.currentIndex--;
      event.target.complete();
    } else {
      this.load(() => {
        event.target.complete();
      }, 0);
    }
  }

  onInput() {
    const data: PageData = this.productService.getListByCondition(this.currentIndex, 8, this.queryTerm);
    this.total = data.total;
    this.products = data.list;
    this.getTotalCostAndTotalInventory(this.products);
    const timerSubscription: Subscription = timer(500).subscribe(() => {

    });

  }

  gotoCategyList() {
    this.router.navigate(['/product/category-list'], {
      queryParams: {
        tab: 'FromProductList'
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  gotoPage(str: string) {
    this.router.navigateByUrl(str);
  }
}

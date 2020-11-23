import { Router } from '@angular/router';
import { ProductService } from './../product/product.service';
import { AjaxResult } from './../../shared/class/ajax-result';
import { Product } from './../product/product';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { timer, Subscription } from 'rxjs';

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

  constructor(
    private loadingController: LoadingController,
    private productService: ProductService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.currentIndex = 0;

    const loading = await this.loadingController.create({
      message: '正在加载数据，请稍候...',
      spinner: 'bubbles',
    });
    loading.present();
    try {
      const result: AjaxResult = await this.productService.getList(this.currentIndex, 8);

      const timerSubscription: Subscription = timer(1000).subscribe(() => {
        loading.dismiss();
        this.total = result.data.total;
        this.products = result.data.list;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async onRefresh(event: any) {
    try {
      const result: AjaxResult = await this.productService.getList(this.currentIndex, 8);
      const timerSubscription: Subscription = timer(500).subscribe(() => {
        event.target.complete();
        this.total = result.data.total;
        this.products = result.data.list;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async onInfinite(event: any) {
    this.currentIndex++;
    if (this.currentIndex >= Math.ceil(this.total / 8)) {
      event.target.complete();
      const toast = await this.toastController.create({
        duration: 3000,
        message: '没有数据了'
      });
      toast.present();
    }
    try {
      const result: AjaxResult = await this.productService.getList(this.currentIndex, 8);
      const timerSubscription: Subscription = timer(1000).subscribe(() => {
        event.target.complete();
        this.total = result.data.total;
        this.products = this.products.concat(result.data.list);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async onInput(event: any) {
    this.queryTerm;
  }

  gotoPage(str: string) {
    this.router.navigateByUrl(str);
  }

}

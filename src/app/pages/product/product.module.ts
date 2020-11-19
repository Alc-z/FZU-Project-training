import { AddProductPage } from './add-product/add-product.page';
import { CategoryEditNamePage } from './category/category-edit-name/category-edit-name.page';
import { CategoryEditPage } from './category/category-edit/category-edit.page';
import { CategoryAddPage } from './category/category-add/category-add.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { CategoryListPage } from './category/category-list/category-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    SharedModule
  ],
  declarations: [
    ProductPage,
    AddProductPage, // 没添加导致ngform
    CategoryAddPage,
    CategoryListPage,
    CategoryEditPage,
    CategoryEditNamePage, // 不添加 input没有返回
  ]
})
export class ProductPageModule {}

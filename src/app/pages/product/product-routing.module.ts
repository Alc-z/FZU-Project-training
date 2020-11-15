
import { CategoryAddPage } from './category/category-add/category-add.page';
import { CategoryEditNamePage } from './category/category-edit-name/category-edit-name.page';
import { CategoryPage } from './category/category.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductPage } from './product.page';
import { CategoryEditPage } from './category/category-edit/category-edit.page';
import { CategoryListPage } from './category/category-list/category-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProductPage
  },
  {
    path: 'category',
    component: CategoryPage
  },
  {
    path: 'category-edit',
    component: CategoryEditPage
    // loadChildren: () => import('./category/category-edit/category-edit.module').then( m => m.CategoryEditPageModule)
  },
  {
    path: 'category-list',
    component: CategoryListPage
    // loadChildren: () => import('./category/category-list/category-list.module').then( m => m.CategoryListPageModule)
  },
  {
    path: 'category-add',
    component: CategoryAddPage
    // loadChildren: () => import('./category/category-add/category-add.module').then( m => m.CategoryAddPageModule)
  },
  {
    path: 'category-edit-name',
    component: CategoryEditNamePage
    // loadChildren: () => import('./category/category-edit-name/category-edit-name.module').then( m => m.CategoryEditNamePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}

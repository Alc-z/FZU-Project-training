import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {

  headTitle: any;
  categoryName: any;
  category: Category;
  newCategoryName: string;
  categoryId: number;
  subCategoryId: number;
  id: number;
  constructor(
    private activatedRouter: ActivatedRoute,
    private categoryService: CategoryService,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.activatedRouter.queryParams.subscribe(queryParams => {
      this.categoryName = queryParams.categoryName;
      // tslint:disable-next-line: radix
      this.id = parseInt(queryParams.id);

      if (this.id !== 0) {
        this.addSubCategory();
      } else {
        this.addCategory();
      }
    });
  }

  private addSubCategory() {
    this.headTitle = '新增小分类';
    this.categoryId = this.categoryService.getCategoryLastIndexByName(this.categoryName) + 1;
    this.subCategoryId = this.categoryService.getSubCategoryLastIndex(this.categoryName) + 1;
    this.category = {
      id: this.categoryId,
      name: '',
      children: [{
        id: this.categoryId * 10 + this.subCategoryId++,
        name: '',
        children: []
      }]
    };
  }

  private addCategory() {
    this.headTitle = '新增商品分类';
    this.categoryId = this.categoryService.getCategoryLength() + 1;
    this.subCategoryId = 1;
    this.category = {
      id: this.categoryId,
      name: '',
      children: [{
        id: this.categoryId * 10 + this.subCategoryId++,
        name: '',
        children: []
      }]
    };
  }

  ngOnInit() {
  }

  onAddSubCategory() {
    this.category.children.push({
      // category 十位上， subcategoryid在各位上
      id: this.categoryId * 10 + this.subCategoryId++,
      name: '',
      children: []
    });
  }

  /**
   * 1、保存商品分类，
   * 2、需要验证是否同名：大分类下，小分类名称不能重复
   * 3、categoryId =0：新增商品分类‘’ ≠0 编辑分类
   * 4、Toast
   */
  async onSave() {
    if (this.categoryName === '大分类') {
      this.category.name = this.newCategoryName;
      if (this.categoryService.insert(this.category) === true) {
        const toast = await this.toastCtrl.create({
          message: '新增成功',
          duration: 3000
        });
        this.router.navigateByUrl('/product/category-list');
        toast.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: '新增失败，存在相同名称或者名称为空',
          duration: 3000
        });
        toast.present();
      }

    } else {
      this.category.name = this.categoryName;
      if (this.categoryService.insertSubCateCategory(this.category) === true) {
        const toast = await this.toastCtrl.create({
          message: '新增成功',
          duration: 3000
        });
        this.router.navigateByUrl('/product/category-list');
        toast.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: '新增失败，存在相同名称或者名称为空',
          duration: 3000
        });
        toast.present();
      }
    }
  }
}

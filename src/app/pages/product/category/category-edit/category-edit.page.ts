import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonItemSliding, ModalController, ToastController } from '@ionic/angular';
import { Category } from '../category';
import { CategoryEditNamePage } from '../category-edit-name/category-edit-name.page';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
})
export class CategoryEditPage implements OnInit {

  private categoryId: any;
  private category: Category;
  private tab: number;
  constructor(
    private modalController: ModalController,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.categoryId = queryParams.categoryId;
      this.category = this.categoryService.getCategoryById(this.categoryId);
    });
  }

  ngOnInit() {
  }

  private async presentModal(name: string) {
    const modal = await this.modalController.create({
      component: CategoryEditNamePage,
      componentProps: { value: name }
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  async onEditCategoryName(item: IonItemSliding) {
    item.close();
    const { data } = await this.presentModal(this.category.name);
    if (data) {
      this.category.name = data;
    }
  }

  /**
   * { var }接受promise
   * @param item
   * @param subCategory
   */
  async onEditSubCategoryName(item: IonItemSliding, subCategory: Category) {
    item.close();
    const { data } = await this.presentModal(subCategory.name);
    this.tab = 0;
    for (const child of this.category.children) {

      if (data === child.name || data === '') {
        const toast = await this.toastCtrl.create({
          message: '编辑失败，存在相同名称或者名称为空',
          duration: 3000
        });
        toast.present();
        this.tab = 1;
        break;
      }
    }
    if (this.tab === 0) {
      subCategory.name = data;
    }
  }

  async onDelete(item: IonItemSliding, subId?: number) {
    const alert = await this.alertController.create({
      header: '你确认要删除吗!',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          handler: async () => {
            console.log('Confirm Okay');
            if (subId != null) {
              item.close();
              this.categoryService.deleteSubCategoryById(this.category, subId);
              this.category = await this.categoryService.getCategoryById(this.categoryId);
            } else if (this.category.children.length === 0) {
              item.close();
              this.categoryService.deleteCategoryById(this.category.id);
              this.router.navigateByUrl('/product/category-list');
            } else {
              item.close();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewDidLeave() {
    if (this.categoryService.modifyCategory(this.category)) {
      console.log('保存成功');
    } else {
      console.log('保存失败');
    }
  }

}

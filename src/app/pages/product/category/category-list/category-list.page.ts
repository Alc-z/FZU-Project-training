import { Category } from './../category';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { CategoryService } from '../category.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.page.html',
    styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {

    categories: Category[];
    activeCategory: Category;
    subCategories: Category[];
    activeSubCategory: Category;
    tab = '';

    constructor(
        private categoryService: CategoryService,
        private actionSheetCtrl: ActionSheetController,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private location: Location,
    ) {
        this.activatedRouter.queryParams.subscribe(queryParams => {
            this.tab = queryParams.tab;
        });
    }


    /**
     * 如果不加第二次进入的时候，不会刷新数据
     */
    ionViewWillEnter() {
        this.categoryService.getCategoriesAsyn().then((data) => {
            this.categories = data.data;
            if (this.categories != null) {
                this.activeCategory = this.categories[0];
                this.subCategories = this.activeCategory.children;
            }
        });
    }

    async onPresentActionSheet() {
        const actionSheet = await this.actionSheetCtrl.create({
            header: '选择您的操作',
            buttons: [
                {
                    text: '新增小分类',
                    role: 'destructive',
                    handler: () => {
                        console.log('Destructive clicked');
                        this.router.navigate(['product/category-add'], { queryParams: { 'categoryName': this.activeCategory.name } });
                    }
                }, {
                    text: '编辑分类',
                    handler: () => {
                        console.log('Archive clicked');
                        this.router.navigate(['product/category-edit'], { queryParams: { 'categoryId': this.activeCategory.id } });
                    }
                }, {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        await actionSheet.present();
    }

    getItemColor(id: number): string {
        if (id === this.activeCategory.id) {
            return '';
        } else {
            return 'light';
        }
    }

    onSelectCategory(category: Category) {
        this.activeCategory = category;
        this.subCategories = this.activeCategory.children;
    }

    onSelectSubCategory(category: Category) {
        if (this.tab === 'FromProductAdd') {
            this.categoryService.setActiveCategory(category);
            this.location.back();
        }
    }

    ngOnInit() { }
}

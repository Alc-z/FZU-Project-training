import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Category } from './category';
import { CATEGORIES } from './mock.categories';

export const CATEGORY_KEY = 'Category';
@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private localStorageService: LocalStorageService) { }

    getCategories(): Category[] {
        const categories = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
        return categories;
    }

    private isValidName(category: Category): boolean {
        if (category == null || (category.name === '')) {
            return false;
        }

        for (const child of category.children) {
            if (child.name === null || child.name === '') {
                return false;
            }
        }

        // 重名
        for (let i = 0; i < category.children.length - 1; i++) {
            for (let j = i + 1; j < category.children.length; j++) {
                if (category.children[i].name === category.children[j].name) {
                    return false;
                }
            }
        }
        return true;
    }

    public getCategoryLength(): number {
        return this.localStorageService.get(CATEGORY_KEY, CATEGORIES).length;
    }

    public getCategoryLastIndexByName(name: string): number {
        const cg = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
        for (let i = 0; i < cg.length; i++) {
            if (cg[i].name === name) {
                return i;
            }
        }
        return -1;
    }

    getCategoryLastIndexById(id: number): number {
        const categories = this.getCategories();
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    getCategoryById(id: string): Category {
        const categories = this.getCategories();
        for (const c of categories) {
            if (c.id.toString() === id) {
                return c;
            }
        }

        const category: Category = {
            id: -1,
            name: '',
            children: []
        };
        return category;
    }


    public getSubCategoryLastIndex(name: string): number {
        const categories = this.getCategories();
        for (const category of categories) {
            if (category.name === name) {
                return category.children.length;
            }
        }
        return -1;
    }


    insert(category: Category): boolean {
        if (this.isValidName(category) === false) {
            return false;
        }
        const tmp = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
        tmp.push(category);
        this.localStorageService.set(CATEGORY_KEY, tmp);
        return true;
    }

    update(category: Category[]) {
        this.localStorageService.set(CATEGORY_KEY, category);
    }

    insertSubCateCategory(category: Category): boolean {
        if (category === null) {
            return false;
        }
        const tmp = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
        const index = this.getCategoryLastIndexByName(category.name);
        console.log(index);
        if (index === -1) {
            return false;
        }

        category.children.forEach(child => {
            tmp[index].children.push(child);
        });

        if (!this.isValidName(tmp[index])) {
            return false;
        } else {
            this.update(tmp);
            return true;
        }
    }

    deleteCategoryById(id: number): boolean {
        const categories = this.getCategories();
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id === id) {
                categories.splice(i, 1);
                this.localStorageService.set(CATEGORY_KEY, categories);
                return true;
            }
        }
        return false;
    }

    deleteSubCategoryById(category: Category, id: number): boolean {
        if (category == null) {
            return false;
        }
        for (let i = 0; i < category.children.length; i++) {
            if (category.children[i].id === id) {
                const index = this.getCategoryLastIndexByName(category.name);
                const categories = this.getCategories();
                categories[index].children.splice(i, 1);
                this.localStorageService.set(CATEGORY_KEY, categories);
                return true;
            }
        }
        return false;
    }

    modifyCategory(cg: Category): boolean {
        const index = this.getCategoryLastIndexById(cg.id);
        if (index === -1) {
            return false;
        }
        const categories = this.getCategories();
        categories[index] = cg;
        this.update(categories);
        return true;
    }

}

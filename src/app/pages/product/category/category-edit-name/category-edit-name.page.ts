import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-category-edit-name',
    templateUrl: './category-edit-name.page.html',
    styleUrls: ['./category-edit-name.page.scss'],
})
export class CategoryEditNamePage implements OnInit {
    name: string;

    constructor(
        private modalController: ModalController,
        private navParams: NavParams
    ) {
        const value = 'value';
        this.name = this.navParams.data[value];
    }

    ngOnInit() {
    }

    dismiss(name?: string) {
        this.modalController.dismiss(name);
    }

    onSave() {
        this.dismiss(this.name);
    }
}

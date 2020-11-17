import { Component, OnInit } from '@angular/core';
import { IonItemSliding, ModalController } from '@ionic/angular';
import { CategoryEditNamePage } from './category-edit-name/category-edit-name.page';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor( private modalController: ModalController) { }

  ngOnInit() {
  }

  
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutAsPageRoutingModule } from './about-us-routing.module';

import { AboutAsPage } from './about-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutAsPageRoutingModule
  ],
  declarations: [AboutAsPage]
})
export class AboutAsPageModule {}

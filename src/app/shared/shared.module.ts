import { CopyrightComponent } from './components/copyright/copyright.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from './services/local-storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDirective } from './directives/confirm.directive';



@NgModule({
  declarations: [
    CopyrightComponent,
    ConfirmDirective
  ],
  providers: [
    LocalStorageService,
    ConfirmDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CopyrightComponent,
    ConfirmDirective
  ]
})
export class SharedModule { }

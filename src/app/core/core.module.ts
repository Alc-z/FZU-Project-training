import { SharedModule } from 'src/app/shared/shared.module';
import { LocalStorageService } from './../shared/services/local-storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    SharedModule,
    LocalStorageService
  ]
})
export class CoreModule { }

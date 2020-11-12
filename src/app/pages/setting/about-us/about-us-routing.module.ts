import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutAsPage } from './about-us.page';

const routes: Routes = [
  {
    path: '',
    component: AboutAsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutAsPageRoutingModule {}

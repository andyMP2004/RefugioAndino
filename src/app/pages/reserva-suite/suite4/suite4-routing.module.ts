import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Suite4Page } from './suite4.page';

const routes: Routes = [
  {
    path: '',
    component: Suite4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Suite4PageRoutingModule {}

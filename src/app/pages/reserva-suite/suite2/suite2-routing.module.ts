import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Suite2Page } from './suite2.page';

const routes: Routes = [
  {
    path: '',
    component: Suite2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Suite2PageRoutingModule {}

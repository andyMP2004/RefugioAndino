import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuiteP4Page } from './suite-p4.page';

const routes: Routes = [
  {
    path: '',
    component: SuiteP4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuiteP4PageRoutingModule {}

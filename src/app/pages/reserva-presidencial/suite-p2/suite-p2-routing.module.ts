import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuiteP2Page } from './suite-p2.page';

const routes: Routes = [
  {
    path: '',
    component: SuiteP2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuiteP2PageRoutingModule {}

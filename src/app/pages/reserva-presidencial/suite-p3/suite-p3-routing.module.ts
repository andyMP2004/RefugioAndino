import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuiteP3Page } from './suite-p3.page';

const routes: Routes = [
  {
    path: '',
    component: SuiteP3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuiteP3PageRoutingModule {}

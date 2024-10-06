import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarsPage } from './agregars.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarsPageRoutingModule {}

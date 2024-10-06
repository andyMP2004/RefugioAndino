import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarpPage } from './agregarp.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarpPageRoutingModule {}

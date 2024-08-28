import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Habitacionf4Page } from './habitacionf4.page';

const routes: Routes = [
  {
    path: '',
    component: Habitacionf4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Habitacionf4PageRoutingModule {}

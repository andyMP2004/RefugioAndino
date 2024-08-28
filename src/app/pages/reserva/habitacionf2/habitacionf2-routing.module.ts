import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Habitacionf2Page } from './habitacionf2.page';

const routes: Routes = [
  {
    path: '',
    component: Habitacionf2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Habitacionf2PageRoutingModule {}

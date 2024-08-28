import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Habitacionf3Page } from './habitacionf3.page';

const routes: Routes = [
  {
    path: '',
    component: Habitacionf3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Habitacionf3PageRoutingModule {}

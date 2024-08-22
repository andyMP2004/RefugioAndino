import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaPresidencialPage } from './reserva-presidencial.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaPresidencialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaPresidencialPageRoutingModule {}

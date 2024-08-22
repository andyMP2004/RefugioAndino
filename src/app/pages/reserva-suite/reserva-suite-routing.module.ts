import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaSuitePage } from './reserva-suite.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaSuitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaSuitePageRoutingModule {}

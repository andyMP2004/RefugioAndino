import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HfamiliarPage } from './hfamiliar.page';

const routes: Routes = [
  {
    path: '',
    component: HfamiliarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HfamiliarPageRoutingModule {}

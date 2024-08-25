import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaPerfilPage } from './reserva-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaPerfilPageRoutingModule {}

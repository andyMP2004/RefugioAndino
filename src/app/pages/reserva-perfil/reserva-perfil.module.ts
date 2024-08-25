import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaPerfilPageRoutingModule } from './reserva-perfil-routing.module';

import { ReservaPerfilPage } from './reserva-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaPerfilPageRoutingModule
  ],
  declarations: [ReservaPerfilPage]
})
export class ReservaPerfilPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaPresidencialPageRoutingModule } from './reserva-presidencial-routing.module';

import { ReservaPresidencialPage } from './reserva-presidencial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaPresidencialPageRoutingModule
  ],
  declarations: [ReservaPresidencialPage]
})
export class ReservaPresidencialPageModule {}

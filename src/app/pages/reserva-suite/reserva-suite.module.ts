import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaSuitePageRoutingModule } from './reserva-suite-routing.module';

import { ReservaSuitePage } from './reserva-suite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaSuitePageRoutingModule
  ],
  declarations: [ReservaSuitePage]
})
export class ReservaSuitePageModule {}

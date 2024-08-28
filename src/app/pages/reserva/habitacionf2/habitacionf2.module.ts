import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Habitacionf2PageRoutingModule } from './habitacionf2-routing.module';

import { Habitacionf2Page } from './habitacionf2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Habitacionf2PageRoutingModule
  ],
  declarations: [Habitacionf2Page]
})
export class Habitacionf2PageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Habitacionf4PageRoutingModule } from './habitacionf4-routing.module';

import { Habitacionf4Page } from './habitacionf4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Habitacionf4PageRoutingModule
  ],
  declarations: [Habitacionf4Page]
})
export class Habitacionf4PageModule {}

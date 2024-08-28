import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Habitacionf3PageRoutingModule } from './habitacionf3-routing.module';

import { Habitacionf3Page } from './habitacionf3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Habitacionf3PageRoutingModule
  ],
  declarations: [Habitacionf3Page]
})
export class Habitacionf3PageModule {}

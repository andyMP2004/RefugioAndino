import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HfamiliarPageRoutingModule } from './hfamiliar-routing.module';

import { HfamiliarPage } from './hfamiliar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HfamiliarPageRoutingModule
  ],
  declarations: [HfamiliarPage]
})
export class HfamiliarPageModule {}

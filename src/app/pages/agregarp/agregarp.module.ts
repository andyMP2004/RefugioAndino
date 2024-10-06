import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarpPageRoutingModule } from './agregarp-routing.module';

import { AgregarpPage } from './agregarp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarpPageRoutingModule
  ],
  declarations: [AgregarpPage]
})
export class AgregarpPageModule {}

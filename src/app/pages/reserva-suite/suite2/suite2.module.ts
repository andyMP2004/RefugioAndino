import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Suite2PageRoutingModule } from './suite2-routing.module';

import { Suite2Page } from './suite2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Suite2PageRoutingModule
  ],
  declarations: [Suite2Page]
})
export class Suite2PageModule {}

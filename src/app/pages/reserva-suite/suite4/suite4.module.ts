import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Suite4PageRoutingModule } from './suite4-routing.module';

import { Suite4Page } from './suite4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Suite4PageRoutingModule
  ],
  declarations: [Suite4Page]
})
export class Suite4PageModule {}

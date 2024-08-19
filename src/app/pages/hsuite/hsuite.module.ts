import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HsuitePageRoutingModule } from './hsuite-routing.module';

import { HsuitePage } from './hsuite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HsuitePageRoutingModule
  ],
  declarations: [HsuitePage]
})
export class HsuitePageModule {}

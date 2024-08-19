import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HpresidencialPageRoutingModule } from './hpresidencial-routing.module';

import { HpresidencialPage } from './hpresidencial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HpresidencialPageRoutingModule
  ],
  declarations: [HpresidencialPage]
})
export class HpresidencialPageModule {}

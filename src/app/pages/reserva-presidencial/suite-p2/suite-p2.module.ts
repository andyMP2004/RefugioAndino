import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuiteP2PageRoutingModule } from './suite-p2-routing.module';

import { SuiteP2Page } from './suite-p2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuiteP2PageRoutingModule
  ],
  declarations: [SuiteP2Page]
})
export class SuiteP2PageModule {}

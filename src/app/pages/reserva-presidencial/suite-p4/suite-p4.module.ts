import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuiteP4PageRoutingModule } from './suite-p4-routing.module';

import { SuiteP4Page } from './suite-p4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuiteP4PageRoutingModule
  ],
  declarations: [SuiteP4Page]
})
export class SuiteP4PageModule {}

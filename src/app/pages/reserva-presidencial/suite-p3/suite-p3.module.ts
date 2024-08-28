import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuiteP3PageRoutingModule } from './suite-p3-routing.module';

import { SuiteP3Page } from './suite-p3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuiteP3PageRoutingModule
  ],
  declarations: [SuiteP3Page]
})
export class SuiteP3PageModule {}

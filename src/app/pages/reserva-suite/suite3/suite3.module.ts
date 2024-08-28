import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Suite3PageRoutingModule } from './suite3-routing.module';

import { Suite3Page } from './suite3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Suite3PageRoutingModule
  ],
  declarations: [Suite3Page]
})
export class Suite3PageModule {}

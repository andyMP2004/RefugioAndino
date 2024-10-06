import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarsPageRoutingModule } from './agregars-routing.module';

import { AgregarsPage } from './agregars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarsPageRoutingModule
  ],
  declarations: [AgregarsPage]
})
export class AgregarsPageModule {}

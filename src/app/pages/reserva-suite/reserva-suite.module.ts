import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaSuitePageRoutingModule } from './reserva-suite-routing.module';

import { ReservaSuitePage } from './reserva-suite.page';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaSuitePageRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  declarations: [ReservaSuitePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservaSuitePageModule {}

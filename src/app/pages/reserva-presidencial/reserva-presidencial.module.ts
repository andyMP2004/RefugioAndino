import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaPresidencialPageRoutingModule } from './reserva-presidencial-routing.module';

import { ReservaPresidencialPage } from './reserva-presidencial.page';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaPresidencialPageRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  declarations: [ReservaPresidencialPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservaPresidencialPageModule {}

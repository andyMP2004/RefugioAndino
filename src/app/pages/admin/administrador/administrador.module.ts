import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { AdministradorPageRoutingModule } from './administrador-routing.module';
import { MatButtonModule } from '@angular/material/button';

import { AdministradorPage } from './administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorPageRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [AdministradorPage]
})
export class AdministradorPageModule {}

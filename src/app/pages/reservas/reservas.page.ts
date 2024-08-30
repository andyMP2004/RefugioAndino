import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  habitaciones: string[] = ['habitacion', 'fecha', 'huespedes', 'acciones','nombres'];
  reservas = [
    { habitacion: 'Suite Familiar', fecha: '2024-08-25', huespedes: '4',nombre: 'esteban' },
    { habitacion: 'Suite Presidencial', fecha: '2024-08-26', huespedes: '2' ,nombre: 'aaron' },
    { habitacion: 'Suite', fecha: '2024-08-27', huespedes: '3',nombre: 'basthian'  } 
  ];

  constructor(private menu: MenuController) {}

  ngOnInit() {
    this.menu.enable(false);
  }
}

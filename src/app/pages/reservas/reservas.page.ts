import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  habitaciones: string[] = ['habitacion', 'fecha', 'huespedes', 'acciones'];
  reservas = [
    { habitacion: 'Suite Familiar', fecha: '2024-08-25', huespedes: '4', editing: false },
    { habitacion: 'Suite Presidencial', fecha: '2024-08-26', huespedes: '2', editing: false },
    { habitacion: 'Suite', fecha: '2024-08-27', huespedes: '3', editing: false } 
  ];

  constructor(private menu: MenuController) {}

  ngOnInit() {
    this.menu.enable(false);
  }

  editar(elemento: { editar: boolean; }) {
    elemento.editar = true;
  }

  guardar(elemento: { editar: boolean; }) {
    elemento.editar = false;
  }

  cancelar(elemento: { editar: boolean; }) {
    elemento.editar = false;
  }
}

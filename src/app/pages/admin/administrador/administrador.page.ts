import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  seleccion: string = "";
  reservas = [
    { habitacion: 'Suite Familiar', fecha: '2024-08-25', huespedes: '4' },
    { habitacion: 'Suite Presidencial', fecha: '2024-08-26', huespedes: '2'},
    { habitacion: 'Suite', fecha: '2024-08-27', huespedes: '3'} 
  ];
  habitaciones = [
    { habitacion: 'Suite Familiar', nhabitacion: '4' },
    { habitacion: 'Suite', nhabitacion: '4' },
    { habitacion: 'Suite Presidencial', nhabitacion: '4' },
  ];
  usuarios = [
    { nombre: 'Andy Madrid', rut: '21687221-5' },
    { nombre: 'Esteban Toledo', rut: '21836167-2' },
    { nombre: 'Aaron Vazques', rut: '22432672-2' },
    { nombre: 'Basthian Bascuñan', rut: '22932723-4' },
  ];

  constructor(private menu: MenuController) { }

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

  eliminar(elemento: any) {
    // Implementar lógica para eliminar el elemento
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  seleccion: string ="";
  habitacioness: string[] = ['habitacion', 'fecha', 'huespedes', 'acciones'];
  reservas = [
    { habitacion: 'Suite Familiar', fecha: '2024-08-25', huespedes: '4' },
    { habitacion: 'Suite Presidencial', fecha: '2024-08-26', huespedes: '2'},
    { habitacion: 'Suite', fecha: '2024-08-27', huespedes: '3'} 
  ];
  habi: string[] = ['habitacion', 'nhabitacion'];
  habitaciones = [
    { habitacion: 'Suite Familiar', nhabitacion: '15' },
    { habitacion: 'Suite', nhabitacion: '30' },
    { habitacion: 'Suite Precidencial', nhabitacion: '50' },

  ];
  usuarioss:string[] = ['nombre','rut']
  usuarios = [
    {nombre:'andy madrid',rut:'21687221-5'},
    {nombre:'esteban toledo',rut:'21836167-2'},
    {nombre:'aaron vazques',rut:'22432672-2'},
    {nombre:'basthian bascuñan ',rut:'22932723-4'}
    
  ]

  constructor(private menu: MenuController) { }

  ngOnInit() {this.menu.enable(false);
  }

}

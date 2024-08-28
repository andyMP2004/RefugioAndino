import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  seleccion: string ="";
  reservas = [
    {habitacion: 'Suite Familiar', fecha: '2024-08-25', hora: '14:00' },
    {habitacion: 'Suite Presidencial', fecha: '2024-08-26', hora: '16:00' },
    {habitacion: 'Suite', fecha: '2024-08-27', hora: '10:00' }
  ];

  habitaciones = [
    {habitacion:'Habitacion Familiar', numero: 15, id:1},
    {habitacion:'Suite de lujo', numero: 30, id:12},
    {habitacion:'Suite precidencial', numero: 50, id:30}

  ];

  usuarios = [
    {nombre:'andy madrid',rut:'21687221-5',id:'1'},
    {nombre:'esteban toledo',rut:'21836167-2',id:'2'},
    {nombre:'aaron vazques',rut:'22432672-2',id:'3'},
    {nombre:'basthian bascuñan ',rut:'22932723-4',id:'4'}
    
  ]

  constructor() { }

  ngOnInit() {
  }

}

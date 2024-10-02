import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BdService} from 'src/app/service/servicios/bd.service';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  nombreusuario: string= "";
  rutusuario: string= "";

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


  arreglousuario: any =  [
    { 
      nombreusuario: '',
      rutusuariuo: ''
    }
  ]
  constructor(private menu: MenuController, private bd: BdService) { }

  ngOnInit() {
    this.menu.enable(false);
    this.bd.dbState().subscribe(res=>{
      this.arreglousuario = res;

    })

  }

  


  eliminar(elemento: any) {
    // Implementar lógica para eliminar el elemento
  }
}

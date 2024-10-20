import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/service/servicios/auth.service';
import { BdService } from 'src/app/service/servicios/bd.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit { 
  
  constructor(private menu: MenuController, private bd: BdService, private router: Router,private authFireBase: AuthService) { }
  idusuario: string = "";
  nombreusuario: string = "";
  rutusuario: string = "";

  seleccion: string = "";
  cantidad: string = "";
  tipohabitacion: string = "";

  idreserva: string = "";
  fecha: string = "";
  total: string = "";
  usuarioidusuario: string = "";

  arreglousuario: any = [
    {
      idusuario: '',
      nombreusuario: '',
      rutusuario: ''
    }
  ];

  arreglohabitacion: any = [
    {
      idhabitacion: '',
      nombre: ''
    }
  ];

  arregloreserva: any = [
    {
      idreserva: '',
      fecha: '',
      total: '',
      usuarioidusuario: ''
    }
  ];
 

  ngOnInit() {
    this.menu.enable(false);

    this.listarHabitaciones();

    this.bd.dbState().subscribe(res => {
      this.arreglousuario = res;
      if (res) {
        this.bd.fetchUsuario().subscribe(users => {
          this.arreglousuario = users;
        });
      }
    });

    this.bd.dbState().subscribe(res => {
      this.arregloreserva = res;
      if (res) {
          this.bd.fetchReserva().subscribe(users => {
            this.arregloreserva = users;
          });
      }
    });
  }


  eliminar(x: any) {
    this.authFireBase.eliminarUsuario(x.idusuario)
    this.bd.eliminarUsuario(x.idusuario);
  }
  eliminarh(x: any) {
    this.bd.eliminarHabi(x.idhabitacion);
    this.listarHabitaciones();
  }

  eliminarr(x: any) {
    this.bd.eliminarReserva(x.idreserva).then(() => {
      this.listarReservas(); 
    })
  }
  
  listarReservas() {
    this.bd.fetchReserva().subscribe((reservas) => {
      this.arregloreserva = reservas;
    });
  }
  
  listarHabitaciones() {
    this.bd.seleccionarHabitaciones().then(() => {
      this.bd.fetchHabitacion().subscribe((habitaciones) => {
        this.arreglohabitacion = habitaciones;
      });
    });
  }


}

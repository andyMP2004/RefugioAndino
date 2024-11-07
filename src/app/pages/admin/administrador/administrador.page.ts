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

  arreglousuarioActivo: any[] = [];
  arreglousuarioDesactivado: any[] = [];

  arregloHabitacionesActivas: any[] = [];
  arregloHabitacionesDesactivadas: any[] = [];

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
  this.listarUsuariosActivos();
  this.listarUsuariosDesactivados();
  this.listarHabitacionesActivas();
    this.listarHabitacionesDesactivadas();
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


  desactivarUsuario(idusuario: number) {
    this.bd.actualizarEstadoUsuario(idusuario, 2).then(() => {
      // Recargar las listas de usuarios después de la desactivación
      this.listarUsuariosActivos();
      this.listarUsuariosDesactivados();
    }).catch(error => {
      console.log('Error al desactivar usuario', error);
    });
  }
  
  
  desactivarHabitacion(idhabitacion: number) {
    this.bd.actualizarEstadoHabitacion(idhabitacion, 2).then(() => {
      // Recargar las listas de habitaciones después de la desactivación
      this.listarHabitacionesActivas();
      this.listarHabitacionesDesactivadas();
    }).catch(error => {
      console.log('Error al desactivar habitación', error);
    });
  }
  activarHabitacion(idhabitacion: number) {
    this.bd.actualizarEstadoHabitacion(idhabitacion, 1).then(() => {
      // Recargar las listas de habitaciones después de la activación
      this.listarHabitacionesActivas();
      this.listarHabitacionesDesactivadas();
    }).catch(error => {
      console.log('Error al activar habitación', error);
    });
  }
  listarHabitacionesActivas() {
    this.bd.fetchHabitacionesPorEstado(1).subscribe((habitaciones) => {
      this.arregloHabitacionesActivas = habitaciones;
    });
  }

  // Listar habitaciones desactivadas
  listarHabitacionesDesactivadas() {
    this.bd.fetchHabitacionesPorEstado(2).subscribe((habitaciones) => {
      this.arregloHabitacionesDesactivadas = habitaciones;
    });
  }


  desactivarReserva(reserva: any) {
    this.bd.actualizarEstadoReserva(reserva.idreserva, 2); // Cambia el estado a 'desactivado'
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

  listarUsuariosActivos() {
    this.bd.fetchUsuariosPorEstado(1).subscribe((usuarios) => {
      this.arreglousuarioActivo = usuarios;
    });
  }
  
  listarUsuariosDesactivados() {
    this.bd.fetchUsuariosPorEstado(2).subscribe((usuarios) => {
      this.arreglousuarioDesactivado = usuarios;
    });
  }

  activarUsuario(idusuario: number) {
    this.bd.actualizarEstadoUsuario(idusuario, 1).then(() => {
      this.listarUsuariosActivos();
      this.listarUsuariosDesactivados();
    });
  }
  

}

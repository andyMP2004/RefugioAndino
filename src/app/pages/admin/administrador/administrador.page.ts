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
  
  constructor(private menu: MenuController, private bd: BdService,private alertController: AlertController, private router: Router,private authFireBase: AuthService) { }
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

  arregloReservasDesactivadas:any[]=[];
  arregloReservasActivas:any[]=[];
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
 
  ionViewWillEnter() {
    this.listarHabitacionesActivas();
    this.listarReservasDesactivadas();
  }
  ngOnInit() {
    this.menu.enable(false);
    this.listarUsuariosActivos();
    this.listarUsuariosDesactivados();
    this.listarHabitacionesDesactivadas();
    this.listarReservas();
    this.listarReservasActivas();
    this.listarReservasDesactivadas();

    
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

    this.bd.dbState().subscribe(res => {
      this.arreglohabitacion = res;
      if (res) {
          this.bd.fetchHabitacion().subscribe(users => {
            this.arreglohabitacion = users;
          });
      }
    });
    
  }


  desactivarUsuario(idusuario: number) {
    this.bd.actualizarEstadoUsuario(idusuario, 2).then(() => {
      // Después de desactivar al usuario, desactivar todas sus reservas
      this.desactivarReservasDeUsuario(idusuario);
  
      // Recargar las listas de usuarios después de la desactivación
      this.listarUsuariosActivos();
      this.listarUsuariosDesactivados();
    }).catch(error => {
      console.log('Error al desactivar usuario', error);
    });
  }
  
  desactivarReservasDeUsuario(idusuario: number) {
    this.bd.fetchReservaPorUsuarioYEstado(idusuario, 1).subscribe((reservasActivas) => {
      reservasActivas.forEach(reserva => {
        this.bd.actualizarEstadoReserva(reserva.idreserva, 2, 'Usuario Desactivado');
      });
      this.listarReservasActivas();
      this.listarReservasDesactivadas();
    });
  }
  
  activarUsuario(idusuario: number) {
    this.bd.actualizarEstadoUsuario(idusuario, 1).then(() => {
      // Cambiar el estado de todas las reservas del usuario a activas
      this.activarReservasDeUsuario(idusuario);
  
      // Recargar las listas de usuarios
      this.listarUsuariosActivos();
      this.listarUsuariosDesactivados();
    })
  }
  
  activarReservasDeUsuario(idusuario: number) {
    this.bd.fetchReservaPorUsuarioYEstado(idusuario, 2).subscribe((reservasDesactivadas) => {
      reservasDesactivadas.forEach(reserva => {
        this.bd.actualizarEstadoReserva(reserva.idreserva, 1, 'Usuario Activado');
      });
      this.listarReservasActivas();
      this.listarReservasDesactivadas();
    });
  }
  
  
  
  desactivarHabitacion(idhabitacion: number) {
    this.bd.actualizarEstadoHabitacion(idhabitacion, 2).then(() => {
      this.listarHabitacionesActivas();
      this.listarHabitacionesDesactivadas();
    }).catch(error => {
      console.log('Error al desactivar habitación', error);
    });
  }
  activarHabitacion(idhabitacion: number) {
    this.bd.actualizarEstadoHabitacion(idhabitacion, 1).then(() => {
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
  
  listarHabitacionesDesactivadas() {
    this.bd.fetchHabitacionesPorEstado(2).subscribe((habitaciones) => {
      this.arregloHabitacionesDesactivadas = habitaciones;
    });
  }
  
  async desactivarReserva(reserva: any) {
    const alert = await this.alertController.create({
      header: 'Desactivar Reserva',
      message: 'Ingrese el motivo de desactivación:',
      inputs: [
        {
          name: 'motivo',
          type: 'text',
          placeholder: 'Motivo de desactivación'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Desactivar',
          handler: (data) => {
            const motivo = data.motivo;
            this.bd.actualizarEstadoReserva(reserva.idreserva, 2, motivo).then(() => {
              this.listarReservasActivas();
              this.listarReservasDesactivadas();
            }).catch(error => {
              console.log('Error al desactivar reserva:', error);
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  
  listarReservasActivas() {
    this.bd.fetchReservaPorEstado(1).subscribe((reservas) => {
      this.arregloReservasActivas = reservas;
    });
  }

  listarReservas() {
    this.bd.fetchReserva().subscribe((reservas) => {
      this.arregloreserva = reservas;
    });
  }

  listarReservasDesactivadas() {
    this.bd.fetchReservaPorEstado(2).subscribe((reservas) => {
      this.arregloReservasDesactivadas = reservas;
    });
  }

  activarReserva(idreserva: number) {
    this.bd.activarReserva(idreserva).then(() => {
      this.listarReservasActivas();
      this.listarReservasDesactivadas();
    }).catch(error => {
      console.log('Error al activar reserva', error);
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



}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/service/servicios/auth.service';
import { BdService } from 'src/app/service/servicios/bd.service';
import { firstValueFrom } from 'rxjs';

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

  arreglousuarioSuperAdmin: any[] = [];

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
    this.listarUsuariosSuperAdmin();
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
      this.desactivarReservasDeUsuario(idusuario);
  
      this.listarUsuariosActivos();
      this.listarUsuariosDesactivados();
    }).catch(error => {
      console.log('Error al desactivar usuario', error);
    });
  }
  
  desactivarReservasDeUsuario(idusuario: number) {
    this.bd.fetchReservaPorUsuarioYEstado(idusuario, 1).subscribe((reservasActivas) => {
      reservasActivas.forEach(reserva => {
        this.bd.actualizarEstadoReserva(reserva.idreserva, 2, 'Usuario Desactivado').then(() => {
          console.log(`Reserva ${reserva.idreserva} desactivada con motivo: Usuario Desactivado`);
        });
      });
      this.listarReservasActivas();
      this.listarReservasDesactivadas();
    });
  }
  
  
  activarUsuario(idusuario: number) {
    this.bd.actualizarEstadoUsuario(idusuario, 1).then(() => {
      this.activarReservasDeUsuario(idusuario);
  
      this.listarUsuariosActivos();
      this.listarUsuariosDesactivados();
    })
  }
  
  activarReservasDeUsuario(idusuario: number) {
    this.bd.fetchReservaPorUsuarioYEstado(idusuario, 2).subscribe((reservasDesactivadas) => {
      reservasDesactivadas.forEach(reserva => {
        if (reserva.motivo === 'Usuario Desactivado') {
          this.bd.actualizarEstadoReserva(reserva.idreserva, 1, 'Usuario Activado');
        }
      });
      this.listarReservasActivas();
      this.listarReservasDesactivadas();
    });
  }
  
  
  desactivarHabitacion(idhabitacion: number) {
    this.bd.actualizarEstadoHabitacion(idhabitacion, 2).then(() => {
      this.bd.fetchReservaPorHabitacionYEstado(idhabitacion, 1).subscribe((reservasActivas) => {
        reservasActivas.forEach(reserva => {
          this.bd.actualizarEstadoReserva(reserva.idreserva, 2, 'Habitación deshabilitada').then(() => {
            console.log(`Reserva ${reserva.idreserva} desactivada con motivo: Habitación deshabilitada`);
          });
        });
        this.listarReservasActivas();
        this.listarReservasDesactivadas();
      });
      this.listarHabitacionesActivas();
      this.listarHabitacionesDesactivadas();
    });
  }
  
  activarHabitacion(idhabitacion: number) {
    this.bd.actualizarEstadoHabitacion(idhabitacion, 1).then(() => {
      this.bd.fetchReservaPorHabitacionYEstado(idhabitacion, 2).subscribe((reservasDesactivadas) => {
        reservasDesactivadas.forEach(reserva => {
          if (reserva.motivo !== 'Habitación deshabilitada') return;
          this.bd.actualizarEstadoReserva(reserva.idreserva, 1, 'Habitación habilitada');
        });
        this.listarReservasActivas();
        this.listarReservasDesactivadas();
      });
  
      this.listarHabitacionesActivas();
      this.listarHabitacionesDesactivadas();
    })
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

  async activarReserva(idreserva: number) {
    try {
      // Obtener la reserva directamente por su ID
      const reserva = await firstValueFrom(this.bd.fetchReservaPorId(idreserva));
  
      // Si no se encuentra la reserva, mostrar mensaje de error
      if (!reserva) {
        const alert = await this.alertController.create({
          header: 'Reserva no encontrada',
          message: 'La reserva solicitada no se encuentra.',
          buttons: ['OK']
        });
        await alert.present();
        return; 
      }
  
      // Verificar si el usuario está activo
      const usuario = await firstValueFrom(this.bd.fetchUsuarioPorId(reserva.usuarioidusuario));
      if (usuario?.estadoidestado === 2) { // Usuario desactivado
        const alert = await this.alertController.create({
          header: 'Usuario Desactivado',
          message: `El usuario asociado a la reserva ${reserva.idreserva} está desactivado, no se puede activar la reserva.`,
          buttons: ['OK']
        });
        await alert.present();
        return; // Salir sin activar la reserva
      }
  
      // Verificar si la habitación asociada está activa
      const habitacion = await firstValueFrom(this.bd.fetchHabitacionPorId(reserva.idhabitacion));
      if (habitacion?.estadoidestado === 2) { // Habitación desactivada
        const alert = await this.alertController.create({
          header: 'Habitación Desactivada',
          message: `La habitación asociada a la reserva ${reserva.idreserva} está desactivada, no se puede activar la reserva.`,
          buttons: ['OK']
        });
        await alert.present();
        return; // Salir sin activar la reserva
      }
  
      // Si tanto el usuario como la habitación están activos, activar la reserva
      await this.bd.activarReserva(reserva.idreserva);
      this.listarReservasActivas();  // Actualizar listado de reservas activas
      this.listarReservasDesactivadas();  // Actualizar listado de reservas desactivadas
  
      const alert = await this.alertController.create({
        header: 'Reserva Activada',
        message: `La reserva ${reserva.idreserva} ha sido activada correctamente.`,
        buttons: ['OK']
      });
      await alert.present();
  
    } catch (error) {
      console.log('Error al activar reserva', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un error al intentar activar la reserva.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  
  
  
  listarHabitaciones() {
    this.bd.seleccionarHabitaciones().then(() => {
      this.bd.fetchHabitacion().subscribe((habitaciones) => {
        this.arreglohabitacion = habitaciones;
      });
    });
  }

  listarUsuariosActivos() {
    this.bd.fetchUsuariosPorEstado(1,'1').subscribe((usuarios) => {
      this.arreglousuarioActivo = usuarios;
    });
  }
  
  
  listarUsuariosDesactivados() {
    this.bd.fetchUsuariosPorEstado(2,'1').subscribe((usuarios) => {
      this.arreglousuarioDesactivado = usuarios;
    });
  }
  listarUsuariosSuperAdmin() {
    this.bd.fetchUsuariosPorEstado(1,'2').subscribe((usuarios) => {
      this.arreglousuarioSuperAdmin = usuarios.filter((usuario: any) => usuario.rolidrol == 2);
    });
  }

}

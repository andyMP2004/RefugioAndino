import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  habitacion: string = "";
  huesped: string = "";
  idreserva: string = "";
  usuarioidusuario: string = "";
  noches: number = 0;
  today = new Date(); // Fecha actual
  minDate: Date = new Date();
  idhabitacion!: number;
  reservas: any[] = []; // Para almacenar las fechas ya reservadas
  fechasDesactivadas: Date[] = []; // Almacenar fechas ocupadas
  fecha!: Date;

  constructor(
    private menu: MenuController,
    private router: Router,
    private alertController: AlertController,
    private bd: BdService,
    private storage: NativeStorage,
    private activatedrouter: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const reserva = navigation.extras.state['reserva'];
      if (reserva) {
        this.idreserva = reserva.idreserva; 
        this.fecha = reserva.fecha;
      }
    }
    this.fecha = new Date();
    this.activatedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.idhabitacion = this.router.getCurrentNavigation()?.extras?.state?.['id'];
      }
    });
  }

  async reservar() {
    if (!this.fecha) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      // Verificar que la fecha y noches no caigan en fechas reservadas
    const fechasReservadas = this.fechasDesactivadas.filter(fechaOcupada => {
      const fechaComparar = new Date(this.fecha);
      for (let i = 0; i < this.noches; i++) {
        if (fechaOcupada.getTime() === fechaComparar.getTime()) {
          return true;
        }
        fechaComparar.setDate(fechaComparar.getDate() + 1);
      }
      return false;
    });

    if (fechasReservadas.length > 0) {
      const alert = await this.alertController.create({
        header: 'Fecha no disponible',
        message: 'No se puede reservar en la fecha seleccionada, ya está ocupada.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
    } else {

      this.bd.modificarReserva(this.idreserva, this.fecha.toString()).then(async () => {
        const alert = await this.alertController.create({
          header: 'Reserva modificada',
          buttons: ['Aceptar'],
        });
        await alert.present();
        this.router.navigate(['/reservas']);
      });
    }
  }
  async cargarFechasReservadas() {
    this.reservas = await this.bd.getReservasPorHabitacion(this.idhabitacion);
    this.fechasDesactivadas = []; // Reiniciar para evitar duplicados
  
    this.reservas.forEach(reserva => {
      const fechaInicio = new Date(reserva.fecha); // Fecha de inicio de la reserva
      const noches = reserva.noches;
  
      // Iteramos por el número de noches reservadas
      for (let i = 0; i < noches; i++) {
        const fechaOcupada = new Date(fechaInicio);
        fechaOcupada.setDate(fechaOcupada.getDate() + i); // Sumamos los días reservados
        this.fechasDesactivadas.push(fechaOcupada); // Añadimos la fecha al array de fechas desactivadas
      }
    });
  }

  desactivarFechas = (d: Date | null): boolean => {
    const fecha = (d || new Date());
  
    // Compara solo año, mes y día de cada fecha
    return !this.fechasDesactivadas.some(desactivada => 
      desactivada.getFullYear() === fecha.getFullYear() &&
      desactivada.getMonth() === fecha.getMonth() &&
      desactivada.getDate() === fecha.getDate()
    );
  }

  ngOnInit() {    
    this.menu.enable(false);
    this.cargarFechasReservadas(); // Cargar fechas reservadas
  }
}

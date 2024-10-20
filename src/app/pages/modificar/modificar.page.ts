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
        this.fecha = new Date(reserva.fecha); // Corrige la conversión a objeto Date
        this.noches = reserva.noches; // Asegúrate de obtener la cantidad de noches
      }
    }
    
    this.activatedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.idhabitacion = this.router.getCurrentNavigation()?.extras?.state?.['id'];
      }
    });
  }

  async verificarHorasExistentes(): Promise<boolean> {
    const reservasExistentes = await this.bd.getReservasPorHabitacion(this.idhabitacion);
    
    const nuevaFechaSinHora = new Date(this.fecha);
    nuevaFechaSinHora.setHours(0, 0, 0, 0);

    for (const reserva of reservasExistentes) {
      const fechaExistente = new Date(reserva.fecha);
      fechaExistente.setHours(0, 0, 0, 0);
      
      // Verificamos si la nueva fecha coincide con alguna fecha ya reservada
      if (nuevaFechaSinHora.getTime() === fechaExistente.getTime()) {
        return true; // Hay conflicto de fecha
      }
    }
    
    return false; // No hay conflictos
  }

  async reservar() {
    if (!this.fecha) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    const conflictoHoras = await this.verificarHorasExistentes();
    if (conflictoHoras) {
      const alert = await this.alertController.create({
        header: 'Conflicto de Horas',
        message: 'La hora seleccionada ya está ocupada para esta habitación.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    const fechaSinHora = new Date(this.fecha);
    fechaSinHora.setHours(0, 0, 0, 0); // Normalizar la fecha sin hora

    // Verificar que la nueva fecha y noches no caigan en fechas reservadas
    const fechasReservadas = this.fechasDesactivadas.filter(fechaOcupada => {
      const fechaComparar = new Date(fechaSinHora);
      for (let i = 0; i < this.noches; i++) {
        if (fechaOcupada.getTime() === fechaComparar.getTime()) {
          return true;
        }
        fechaComparar.setDate(fechaComparar.getDate() + 1);
      }
      return false;
    });

    // Si hay fechas reservadas, mostrar alerta y no modificar
    if (fechasReservadas.length > 0) {
      const alert = await this.alertController.create({
        header: 'Fecha no disponible',
        message: 'No se puede reservar en la fecha seleccionada, ya está ocupada.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    // Si no hay conflictos, proceder a modificar la reserva
    await this.bd.modificarReserva(this.idreserva, fechaSinHora.toISOString().split('T')[0]);
    
    const alert = await this.alertController.create({
      header: 'Reserva modificada',
      buttons: ['Aceptar'],
    });
    await alert.present();
    this.router.navigate(['/reservas']);
}

  async cargarFechasReservadas() {
    this.reservas = await this.bd.getReservasPorHabitacion(this.idhabitacion);
    this.fechasDesactivadas = []; // Reiniciar para evitar duplicados

    this.reservas.forEach(reserva => {
      const fechaInicio = new Date(reserva.fecha); 
      const noches = reserva.noches;

      // Iteramos por el número de noches reservadas
      for (let i = 0; i < noches; i++) {
        const fechaOcupada = new Date(fechaInicio);
        fechaOcupada.setDate(fechaOcupada.getDate() + i); // Sumar los días reservados
        this.fechasDesactivadas.push(fechaOcupada); // Añadir al array de fechas ocupadas
      }
    });
  }

  desactivarFechas = (d: Date | null): boolean => {
    if (!d) return true; // Permitir selección si no hay fecha
    
    // Normalizamos la fecha seleccionada eliminando la hora
    const fechaSeleccionada = new Date(d);
    fechaSeleccionada.setHours(0, 0, 0, 0);
    
    // Comparamos solo la fecha (sin hora) con las fechas desactivadas
    return !this.fechasDesactivadas.some(fecha => {
      const fechaNormalizada = new Date(fecha);
      fechaNormalizada.setHours(0, 0, 0, 0);
      return fechaNormalizada.getTime() === fechaSeleccionada.getTime();
    });
  };

  fechaOcupada(): boolean {
    const fechaComparar = new Date(this.fecha);
    
    for (let i = 0; i < this.noches; i++) {
      const fechaVerificar = new Date(fechaComparar);
      fechaVerificar.setDate(fechaVerificar.getDate() + i); // Comprueba cada fecha en el rango

      // Verifica si esta fecha está ocupada
      if (this.fechasDesactivadas.some(fechaOcupada =>
        fechaOcupada.getFullYear() === fechaVerificar.getFullYear() &&
        fechaOcupada.getMonth() === fechaVerificar.getMonth() &&
        fechaOcupada.getDate() === fechaVerificar.getDate()
      )) {
        return true; // Al menos una fecha está ocupada
      }
    }
    return false; // Ninguna fecha está ocupada
  }

  ngOnInit() {    
    this.menu.enable(false);
    this.cargarFechasReservadas(); // Cargar fechas reservadas
    this.verificarHorasExistentes(); // Llamar a la función aquí si es necesario
  }
}

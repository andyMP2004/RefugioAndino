import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BdService } from 'src/app/service/servicios/bd.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { DivisaService } from 'src/app/service/servicios/divisa.service';

@Component({
  selector: 'app-reserva-presidencial',
  templateUrl: './reserva-presidencial.page.html',
  styleUrls: ['./reserva-presidencial.page.scss'],
})
export class ReservaPresidencialPage implements OnInit {

  monedaSeleccionada: string = 'USD'; // Moneda seleccionada
  totalConvertido: number = 0;  // Propiedad para almacenar el total convertido
  habitacion: string = "";
  huesped: string = "";
  fecha: Date;
  total: number = 60000;
  idreserva: string = "";
  usuarioidusuario: string = "";
  noches: number = 0;
  idusuario: string = "";
  nombreusuario: string = "";
  today = new Date(); // Fecha actual
  diamin: Date;
  minDate: Date = new Date();
  idhabitacion! : number ;
  reservas: any[] = []; // Para almacenar las fechas ya reservadas
  fechasDesactivadas: Date[] = []; // Almacenar fechas ocupadas


  constructor(private router: Router, private menu: MenuController, private alertController: AlertController, private bd: BdService, private storage: NativeStorage,private divisaService: DivisaService, private activatedrouter: ActivatedRoute) { 
    { this.diamin = this.today 
      this.fecha = new Date();
      this.activatedrouter.queryParams.subscribe(res=>{
        if(this.router.getCurrentNavigation()?.extras.state){
          this.idhabitacion = this.router.getCurrentNavigation()?.extras?.state?.['id'];

        }
      })
      }}

  private valor(value: number): string {
    return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }

  async reservar() {
    if (!this.noches || !this.fecha) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
  
    // Eliminar la hora antes de guardar la fecha
    const fechaSinHora = new Date(this.fecha);
    fechaSinHora.setHours(0, 0, 0, 0); // Configura la hora en 00:00:00
  
    // Verificar que la fecha y noches no caigan en fechas reservadas
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
  
    if (fechasReservadas.length > 0) {
      const alert = await this.alertController.create({
        header: 'Fecha no disponible',
        message: 'No se puede reservar en la fecha seleccionada, ya está ocupada.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
  
    // Conversión de moneda
    const totalEnPesos = this.valor(this.total); // Asegúrate de que esto sigue siendo correcto
    try {
      const totalConvertido = await this.divisaService.convertCurrency(this.total, this.monedaSeleccionada);
      this.totalConvertido = totalConvertido; 
  
      // Guardar la fecha en el formato ISO sin la hora
      await this.bd.insertarReservap(fechaSinHora.toISOString().split('T')[0], this.noches, totalEnPesos, this.idusuario, this.idhabitacion);
  
      const notificationId = Math.floor(Math.random() * 1000); 
      const notificationDate = new Date(Date.now() + 10000);
  
      if (notificationDate.getTime() > Date.now()) {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Reserva Confirmada',
              body: `Tu reserva ha sido realizada para el ${fechaSinHora.toLocaleDateString()}.`,
              id: notificationId,
              schedule: { at: notificationDate },
            }
          ]
        });
      }
  
      this.router.navigate(['/habitaciones']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo realizar la reserva. Intente nuevamente.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
  async calculartotal() {
    const precio = 60000;
    this.total = this.noches * precio;

    try {
      this.totalConvertido = await this.divisaService.convertCurrency(this.total, this.monedaSeleccionada);
    } catch (error) {
      console.error('Error al convertir la moneda:', error);
    }
  }


  async cargarFechasReservadas() {
    this.reservas = await this.bd.getReservasPorHabitacion(this.idhabitacion);
    this.fechasDesactivadas = []; // Reiniciar para evitar duplicados
  
    this.reservas.forEach(reserva => {
      const fechaInicio = new Date(reserva.fecha); 
      fechaInicio.setHours(0, 0, 0, 0); // Eliminar la hora
  
      const noches = reserva.noches;
      
      // Iteramos por el número de noches reservadas
      for (let i = 0; i < noches; i++) {
        const fechaOcupada = new Date(fechaInicio);
        fechaOcupada.setDate(fechaOcupada.getDate() + i); // Añadir los días reservados
        fechaOcupada.setHours(0, 0, 0, 0); // Asegurarse de que no haya horas
        this.fechasDesactivadas.push(fechaOcupada); // Guardar la fecha sin horas
      }
    });
  }
  

  desactivarFechas = (d: Date | null): boolean => {
    if (!d) return true; // Permitir selección si no hay fecha
  
    // Normalizamos la fecha seleccionada eliminando la hora
    const fechaSeleccionada = new Date(d);
    fechaSeleccionada.setHours(0, 0, 0, 0);
  
    // Comparamos solo la fecha (sin hora) con las fechas desactivadas
    const fechaOcupada = this.fechasDesactivadas.some(fecha => {
      const fechaNormalizada = new Date(fecha);
      fechaNormalizada.setHours(0, 0, 0, 0);
      return fechaNormalizada.getTime() === fechaSeleccionada.getTime();
    });
  
    return !fechaOcupada; // Si está ocupada, la deshabilitamos
  };

  fechaOcupada(): boolean {
    const fechaComparar = new Date(this.fecha);
    
    for (let i = 0; i < this.noches; i++) {
      if (this.fechasDesactivadas.some(fechaOcupada =>
        fechaOcupada.getFullYear() === fechaComparar.getFullYear() &&
        fechaOcupada.getMonth() === fechaComparar.getMonth() &&
        fechaOcupada.getDate() === fechaComparar.getDate()
      )) {
        return true; // Hay al menos una fecha ocupada
      }
      fechaComparar.setDate(fechaComparar.getDate() + 1); // Avanza a la siguiente noche
    }
  
    return false; // Ninguna fecha está ocupada
  }


  async ngOnInit() {
    this.menu.enable(false);
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display == 'granted') {
      console.log('Permisos de notificación otorgados');
    }

    this.storage.getItem('usuario').then(async (data) => {
      const idusuario = data;
      const usuario = await this.bd.BuscarUsu(idusuario);
      if (usuario) {
        this.idusuario = usuario.idusuario;
        this.nombreusuario = usuario.nombreusuario;
      }
    });

    await this.cargarFechasReservadas(); // Cargar fechas reservadas
  }
}
import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BdService } from 'src/app/service/servicios/bd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  habitacion: string = "";
  huesped: string = "";
  fecha: string = "";
  total: number = 20000; 
  idreserva: string = "";
  usuarioidusuario: string = "";
  noches: number = 0;
  idusuario: string = "";
  nombreusuario: string = "";

  constructor(
    private router: Router, 
    private menu: MenuController, 
    private alertController: AlertController, 
    private bd: BdService, 
    private storage: NativeStorage
  ) { }

  private valor(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  async reservar() {
    if (!this.noches || !this.fecha) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else {
      const fechaSinHora = this.fecha.split('T')[0]; 
      const total = this.valor(this.total);

      this.bd.insertarReserva(fechaSinHora, total, this.idusuario);

      const notificationId = Math.floor(Math.random() * 1000); 

      const notificationDate = new Date(Date.now() + 10000); 
      console.log('Notificación programada para:', notificationDate); 

      if (notificationDate.getTime() > Date.now()) {
        try {
          await LocalNotifications.schedule({
            notifications: [
              {
                title: 'Reserva Confirmada',
                body: `Tu reserva ha sido realizada para el ${fechaSinHora}.`,
                id: notificationId,
                schedule: { at: notificationDate },
              }
            ]
          });
          console.log('Notificación programada con éxito');
        } catch (error) {
          console.error('Error programando la notificación:', error);
        }
      }

      this.router.navigate(['/habitaciones']);
    }
  }

  calculartotal() {
    const precio = 20000;
    this.total = this.noches * precio;
  }

  async ngOnInit() {
    this.menu.enable(false);
  
    // Solicitar permisos de notificaciones
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display == 'granted') {
      console.log('Permisos de notificación otorgados');
    } else {
      console.log('Permisos de notificación denegados');
    }
  
    this.storage.getItem('usuario').then((data) => {
      const idusuario = data;
      this.bd.BuscarUsu(idusuario).then((usuario) => {
        if (usuario) {
          this.idusuario = usuario.idusuario;
          this.nombreusuario = usuario.nombreusuario;
        }
      });
    });
  }
  
}

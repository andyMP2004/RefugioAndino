import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { BdService } from 'src/app/service/servicios/bd.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-reserva-presidencial',
  templateUrl: './reserva-presidencial.page.html',
  styleUrls: ['./reserva-presidencial.page.scss'],
})
export class ReservaPresidencialPage implements OnInit {


  habitacion: string = "";
  huesped: string = "";
  fecha: string = "";
  total: number = 60.000;
  idreserva: string = "";
  usuarioidusuario: string = "";
  noches: number = 0;
  idusuario: string = "";
  nombreusuario: string = "";
  constructor(private router: Router, private menu: MenuController, private alertController: AlertController, private bd: BdService, private storage: NativeStorage) { }

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
    } else {
      const fechaSinHora = this.fecha.split('T')[0]; 
      const total = this.valor(this.total);

      this.bd.insertarReserva(fechaSinHora, total, this.idusuario);

      const notificationId = Math.floor(Math.random() * 1000);
      const notificationDate = new Date(fechaSinHora);
      console.log('Notificación programada para:', notificationDate);

      if (notificationDate.getTime() > Date.now()) {
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
      }
      this.router.navigate(['/habitaciones']);
    }
  }

  calculartotal() {
    const precio = 60000;
    this.total = Number(this.noches) * precio;
  }

  ngOnInit() {
    this.menu.enable(false);
    this.storage.getItem('usuario').then((data) => {
      const idusuario = data;
      this.bd.BuscarUsu(idusuario).then((usuario) => {
        if (usuario) {
          this.idusuario = usuario.idusuario;
          this.nombreusuario = usuario.nombreusuario;
        }
      })
    })
  }
}

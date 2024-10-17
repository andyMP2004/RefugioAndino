import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BdService } from 'src/app/service/servicios/bd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { LocalNotifications } from '@capacitor/local-notifications';
import { DivisaService } from 'src/app/service/servicios/divisa.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
   monedaSeleccionada: string = 'USD'; 
  totalConvertido: number = 0; 
  habitacion: string = "";
  huesped: string = "";
  total: number = 20.000; 
  idreserva: string = "";
  usuarioidusuario: string = "";
  idusuario: string = "";
  nombreusuario: string = "";
  fecha: Date;
  noches: number = 0;
  today = new Date(); // Fecha actual
  diamin: Date;
  minDate: Date = new Date();
  constructor(
    
    private router: Router, 
    private menu: MenuController, 
    private alertController: AlertController, 
    private bd: BdService, 
    private storage: NativeStorage,
    private divisaService: DivisaService  
    
  ) { this.diamin = this.today 
    this.fecha = new Date();}

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
       
        const totalEnPesos = this.valor(this.total);
  
        try {
          // Convertir a la moneda seleccionada solo para mostrar
          const totalConvertido = await this.divisaService.convertCurrency(this.total, this.monedaSeleccionada);
          this.totalConvertido = totalConvertido; 
          console.log(`Total convertido a ${this.monedaSeleccionada}: ${totalConvertido}`);
  
          this.bd.insertarReserva(this.fecha.toString(),this.noches, totalEnPesos, this.idusuario); 
        } catch (error) {
          console.error('Error al convertir la moneda:', error);
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se pudo convertir la moneda. Intente nuevamente.',
            buttons: ['Aceptar'],
          });
          await alert.present();
          return;
        }
  
        const notificationId = Math.floor(Math.random() * 1000); 
        const notificationDate = new Date(Date.now() + 10000);
  
        if (notificationDate.getTime() > Date.now()) {
          try {
            await LocalNotifications.schedule({
              notifications: [
                {
                  title: 'Reserva Confirmada',
                  body: `Tu reserva ha sido realizada para el ${this.fecha}.`,
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
  
    async calculartotal() {
      const precio = 20000;
      this.total = this.noches * precio;
  
      try {
        this.totalConvertido = await this.divisaService.convertCurrency(this.total, this.monedaSeleccionada);
      } catch (error) {
        console.error('Error al convertir la moneda:', error);
      }
    }
  
    async ngOnInit() {
      this.menu.enable(false);
    
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

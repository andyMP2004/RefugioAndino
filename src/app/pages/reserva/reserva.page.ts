import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BdService } from 'src/app/service/servicios/bd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

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

  constructor(private router: Router, private menu: MenuController, private alertController: AlertController, private bd: BdService, private storage: NativeStorage) { }

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
      this.bd.insertarReserva(fechaSinHora, this.total.toString(), this.usuarioidusuario);    
      this.router.navigate(['/habitaciones']);
    }
  }

  calculartotal() {
    const precio = 20000;
    this.total = Number(this.noches) * precio;
  }

  ngOnInit() {
    this.menu.enable(false);
  }
}

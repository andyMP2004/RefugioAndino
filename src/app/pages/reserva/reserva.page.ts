import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
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
  total: string= "$20.000";
  idreserva:string="";
  usuarioidusuario:string="";

  constructor(private router: Router,private menu: MenuController, private alertController: AlertController,private bd: BdService, private storage: NativeStorage) { }

  async reservar(){
    if (!this.huesped || !this.fecha) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
  }else {
    this.router.navigate(['/habitaciones'] );
    const alert = await this.alertController.create({
      header: 'Reserva confrimada',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}

  ngOnInit() {this.menu.enable(false);}

  insertar(){
    this.bd.insertarReserva(this.fecha, this.total, this.usuarioidusuario);
  }

}
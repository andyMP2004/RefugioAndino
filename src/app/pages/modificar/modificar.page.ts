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
  fecha: string = "";
  idreserva:string="";
  usuarioidusuario:string="";
  noches:number=0;
  reserva: any;
  constructor(private menu: MenuController,private activedrouter: ActivatedRoute,private router: Router, private alertController: AlertController,private bd: BdService, private storage: NativeStorage) { 
   }

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

  modificar(){
    this.bd.modificarReserva(this.fecha,this.idreserva);
  }
}

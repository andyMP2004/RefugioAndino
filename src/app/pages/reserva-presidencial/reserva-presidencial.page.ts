import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { BdService } from 'src/app/service/servicios/bd.service';

@Component({
  selector: 'app-reserva-presidencial',
  templateUrl: './reserva-presidencial.page.html',
  styleUrls: ['./reserva-presidencial.page.scss'],
})
export class ReservaPresidencialPage implements OnInit {


  habitacion: string = "";
  huesped: string = "";
  fecha: string = "";
  total: number=60.000;
  idreserva:string="";
  usuarioidusuario:string="";
  noches:number=0;
  constructor(private router: Router,private menu: MenuController, private alertController: AlertController,private bd: BdService) { }

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
  calculartotal() {
    const precio = 60000;
    this.total = Number(this.noches) * precio;
  }
  insertar(){
    this.bd.insertarReserva(this.fecha, this.total.toString(), this.usuarioidusuario);
  }
}

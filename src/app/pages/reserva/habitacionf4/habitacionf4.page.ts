import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-habitacionf4',
  templateUrl: './habitacionf4.page.html',
  styleUrls: ['./habitacionf4.page.scss'],
})
export class Habitacionf4Page implements OnInit {

  habitacion: string = "Habitacion Deluxe";
  huesped: string = "";
  noche: string = "";
  



  constructor(private router: Router,private menu: MenuController, private alertController: AlertController) { }

  async reservar(){
    if (!this.huesped || !this.noche) {
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
  ngOnInit() {
  }

}

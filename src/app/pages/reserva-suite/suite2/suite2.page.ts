import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-suite2',
  templateUrl: './suite2.page.html',
  styleUrls: ['./suite2.page.scss'],
})
export class Suite2Page implements OnInit {

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

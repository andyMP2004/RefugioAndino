import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  camas: string ="";
  banos: string ="";
  constructor(private menu: MenuController, private router: Router, private alertController: AlertController) { }


  async agregar(){
    if (!this.banos || !this.camas) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['añadir'],
      });
      await alert.present();
  }else {
    const alert = await this.alertController.create({
      header: 'habitacion agregada',
      buttons: ['añadir'],
    });
    await alert.present();
  }
    
    let navigationExtras: NavigationExtras = {
      state: {
        cam: this.camas,
        ban: this.banos,
      }
    }
    this.router.navigate(['/hfamiliar'], navigationExtras) ;
}
  ngOnInit() {this.menu.enable(false);
  }
}

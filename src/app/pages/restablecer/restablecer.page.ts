import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  usuario: string = "";
  contrasena: string = "";

  constructor(private router: Router, private alertController: AlertController) {}
 
  async irPagina() {
    let navigationExtras: NavigationExtras = {
      state: {
        usu: this.usuario,
        con: this.contrasena,
      }
    };
    if (this.usuario == "david@gmail.com" && this.contrasena == "1234") {
      const alert = await this.alertController.create({
        header: 'Contraseña igual que la anterior ',
        message: 'Intente nuevamente',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }else if(this.usuario != "david@gmail.com"){
      const alert = await this.alertController.create({
        header: 'Correo invalido ',
        message: 'Intente Nuevamente',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }else{
      const alert = await this.alertController.create({
        header: 'Contraseña Actualizada',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }

  ngOnInit() {
  }

}

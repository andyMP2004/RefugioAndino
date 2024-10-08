import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  usuario: string = "";
  contrasena: string = "";
  contraNueva: string ="";

  constructor(private router: Router, private alertController: AlertController ,private menu:MenuController) {}
 
  async irPagina() {
    if (!this.usuario || !this.contrasena) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } 
    else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(this.usuario)) {
      const alert = await this.alertController.create({
        header: 'Correo inválido',
        message: 'Por favor, ingrese un correo electrónico válido.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    else if (this.contrasena.length < 6 || this.contrasena.length > 12) {
      const alert = await this.alertController.create({
        header: 'Contraseña inválida',
        message: 'La contraseña debe tener entre 6 y 12 caracteres.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    else if (!/(?=.*[A-Z])/.test(this.contrasena)) {
      const alert = await this.alertController.create({
        header: 'Contraseña invalida',
        message: 'La contraseña debe contener al menos una letra mayuscula.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    else if (!/(?=.*[a-z])/.test(this.contrasena)) {
      const alert = await this.alertController.create({
        header: 'Contraseña invalida',
        message: 'La contraseña debe contener al menos una letra minuscula.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }

    else if (!/(?=.*\d)/.test(this.contrasena)) {
      const alert = await this.alertController.create({
        header: 'Contraseña invalida',
        message: 'La contraseña debe contener al menos un numero.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }else {
      const alert = await this.alertController.create({
        header: 'Contraseña Actualizada',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
  ngOnInit() {this.menu.enable(false);
  }

}
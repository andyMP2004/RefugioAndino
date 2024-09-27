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

  constructor(private router: Router, private alertController: AlertController ,private menu:MenuController) {}
 
  async irPagina() {
    if (!this.usuario || !this.contrasena) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else if (this.usuario.length < 6 || this.usuario.length > 20 || !this.usuario.includes('@gmail.com')) {
      const alert = await this.alertController.create({
        header: 'Por favor complete correctamente los datos',
        message: 'Por favor, ingrese los datos correctamente',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }else if (this.contrasena.length<6 || this.contrasena.length>12){
      const alert = await this.alertController.create({
        header: 'contraseña invalida',
        message: 'la contraseña debe tener entre 6 y 12 caracteres',
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
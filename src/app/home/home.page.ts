import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  usuario: string = "";
  contrasena: string = "";

  constructor(private router: Router, private alertController: AlertController, private menu:MenuController) {}

  async irPagina() {
    if (!this.usuario || !this.contrasena) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacios',
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
    } else {
      let navigationExtras: NavigationExtras = {
        state: {
          usu: this.usuario,
          con: this.contrasena,
        }
      };
  
      if (this.usuario == "admin@gmail.com" && this.contrasena == "1234567") {
        this.router.navigate(['/administrador'], navigationExtras);
      }else if (this.contrasena.length<6 || this.contrasena.length>12){
        const alert = await this.alertController.create({
          header: 'contraseña invalida',
          message: 'la contraseña debe tener entre 6 y 12 caracteres',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
       else {
        this.router.navigate(['/miperfil'], navigationExtras);
      }
    }
  }
  
  ngOnInit() {this.menu.enable(false);
  }
}

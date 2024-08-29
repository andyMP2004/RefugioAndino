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
    } else {
      let navigationExtras: NavigationExtras = {
        state: {
          usu: this.usuario,
          con: this.contrasena,
        }
      };
  
      if (this.usuario == "admin@gmail.com" && this.contrasena == "1234") {
        this.router.navigate(['/administrador'], navigationExtras);
      } else {
        this.router.navigate(['/miperfil'], navigationExtras);
      }
    }
  }
  
  
  ngOnInit() {this.menu.enable(false);
  }
}

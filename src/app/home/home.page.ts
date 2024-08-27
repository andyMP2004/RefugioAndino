import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
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
    if (this.usuario == "admin" && this.contrasena == "1234") {
      this.router.navigate(['/administrador'], navigationExtras);
    } else if (this.usuario == "david@gmail.com" && this.contrasena == "1234") {
      this.router.navigate(['/miperfil'], navigationExtras);
    } else {
      const alert = await this.alertController.create({
        header: 'No se puede iniciar sesión',
        subHeader: 'Datos incorrectos',
        message: 'Intente nuevamente',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
  ngOnInit() {
  }
}

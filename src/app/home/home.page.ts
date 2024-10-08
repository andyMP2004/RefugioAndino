import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { BdService } from '../service/servicios/bd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  correo: string = "";
  contrasena: string = "";

  constructor(
    private router: Router,
    private alertController: AlertController,
    private menu: MenuController,
    private bd: BdService,
    private storage: NativeStorage
  ) { }



  async irPagina() {

    if (this.correo == "" , this.contrasena == "") {
      const alert = await this.alertController.create({
        header: 'Campos Vacios',
        message: 'Por favor intente de nuevo',
        buttons: ['OK'],

      });
      await alert.present();
    } else {

      let ValidarUsuario = await this.bd.Login(this.correo, this.contrasena);

      if (ValidarUsuario) {
        // Guardar los datos del usuario en el NativeStorage
        this.storage.setItem('usuario', ValidarUsuario.idusuario);

        this.router.navigate(['/habitaciones']);

      }
      if (this.correo == "admin@gmail.com" , this.contrasena == "Admin123") {
      this.router.navigate(['/administrador']);
    }
 
      else {
        const alert = await this.alertController.create({
          header: 'Error al iniciar Sesion',
          message: 'Usuario o Contraseña incorrecta',
          buttons: ['OK'],
        });
        await alert.present();
      }

    }

   }

  ngOnInit() {
    this.menu.enable(false);
  }
}

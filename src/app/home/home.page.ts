import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { BdService } from '../service/servicios/bd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AuthService } from 'src/app/service/servicios/auth.service';
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
    private storage: NativeStorage,
    private authService: AuthService
  ) { }



  async irPagina() {
    if (this.correo === "" && this.contrasena === "") { 
      const alert = await this.alertController.create({
        header: 'Campos Vacíos',
        message: 'Por favor intente de nuevo',
        buttons: ['OK'],
      });
      await alert.present();
    } else {

      if (this.correo === "admin@gmail.com" && this.contrasena === "Admin123") { 
        this.router.navigate(['/administrador']);
        return;
      }
  
      let ValidarUsuario = await this.authService.inicioSesion(this.correo, this.contrasena);
      let Validarcorreo = await this.bd.BuscarUsuC(this.correo);
  
      if (Validarcorreo && Validarcorreo.estadoidestado === 2) {
        const alert = await this.alertController.create({
          header: 'Usuario Desactivado',
          message: 'Su cuenta está desactivada',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      } else if (ValidarUsuario) {
        await this.bd.modificarContra(this.correo, Validarcorreo.idusuario);
        // Guardar los datos del usuario en el NativeStorage
        await this.storage.setItem('usuario', Validarcorreo.idusuario);
        this.router.navigate(['/habitaciones']);
      } else {
        const alert = await this.alertController.create({
          header: 'Inicio de Sesión Fallido',
          message: 'Correo o contraseña incorrectos.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
  

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menu.enable(false);
    this.correo = "";
    this.contrasena = "";
  }

}

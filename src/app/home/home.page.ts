import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { BdService } from '../service/servicios/bd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AuthService } from 'src/app/service/servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  correo: string = "";
  contrasena: string = "";
  errorMessage: string = ""; // Nueva propiedad para almacenar el mensaje de error

  constructor(
    private router: Router,
    private alertController: AlertController,
    private menu: MenuController,
    private bd: BdService,
    private storage: NativeStorage,
    private authService: AuthService
  ) { }

  async irPagina() {
    if (this.correo == "" || this.contrasena == "") {
      this.errorMessage = "Debe rellenar todos los campos";
      const alert = await this.alertController.create({
        header: 'Campos Vacíos',
        message: 'Por favor intente de nuevo',
        buttons: ['OK'],
      });
      await alert.present();
      return; 
    }
  
    this.errorMessage = "";
    try {
      let CredencialFireBase = await this.authService.inicioSesion(this.correo, this.contrasena);
  
      if (CredencialFireBase) {
        // Buscar usuario en la base de datos local
        let ValidarUsuario = await this.bd.BuscarUsuC(this.correo);
  
        if (ValidarUsuario) {
          if (ValidarUsuario.estadoidestado === 2) { 
            const alert = await this.alertController.create({
              header: 'Usuario Desactivado',
              message: 'Contacta con soporte',
              buttons: ['OK'],
              cssClass: 'estilo-alertas',
            });
            await alert.present();
            return; 
          }
  
          await this.bd.modificarContra(this.contrasena, ValidarUsuario.idusuario);
  
          await this.storage.setItem('usuario', ValidarUsuario.idusuario);
  
          if (ValidarUsuario.rolidrol === '2') { 
            this.router.navigate(['/administrador']);
          } else { // Otros roles: Habitaciones
            this.router.navigate(['/habitaciones']);
          }
        } else {
          const alert = await this.alertController.create({
            header: 'Error al iniciar sesión',
            message: 'Usuario o contraseña incorrectos, por favor intente de nuevo.',
            buttons: ['OK'],
            cssClass: 'estilo-alertas',
          });
          await alert.present();
        }
      } else {
        const alert = await this.alertController.create({
          header: 'Error al iniciar sesión',
          message: 'Usuario o contraseña incorrectos, por favor intente de nuevo.',
          buttons: ['OK'],
          cssClass: 'estilo-alertas',
        });
        await alert.present();
      }
    } catch (error) {
      console.error(error);
      const alert = await this.alertController.create({
        header: 'Error al iniciar sesión',
        message: 'Usuario o contraseña incorrectos, por favor intente de nuevo.',
        buttons: ['OK'],
        cssClass: 'estilo-alertas',
      });
      await alert.present();
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

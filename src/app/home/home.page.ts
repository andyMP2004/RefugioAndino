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
    if (this.correo === "" || this.contrasena === "") { 
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
    try {
          let CredencialFireBase = await this.authService.inicioSesion(this.correo, this.contrasena);
          
          if (CredencialFireBase) {

            // Verificamos el usuario en la base de datos
            let ValidarUsuario = await this.bd.BuscarUsuC(this.correo);
    
            if (ValidarUsuario) {

              if (ValidarUsuario.estadoidestado == '2') {
                const alert = await this.alertController.create({
                    header: 'Usuario Desactivado',
                    message: 'Contacta con soporte',
                    buttons: ['OK'],
                    cssClass: 'estilo-alertas'
                });
                await alert.present();
                return;
              }

              await this.bd.modificarContra(this.contrasena, ValidarUsuario.idusuario);

              // Guardar los datos del usuario en el NativeStorage
              await this.storage.setItem('usuario', ValidarUsuario.idusuario);

              /* if (ValidarUsuario.id_rol_fk == "1") {
                this.router.navigate(['/homeadmin']);
              }else{
                // Redirigir al home */
                this.router.navigate(['/habitaciones']);
              /* } */
              
            } else { 
              const alert = await this.alertController.create({
                header: 'Error al iniciar sesión',
                message: 'Usuario o contraseña incorrectos, por favor intente de nuevo.',
                buttons: ['OK'],
                cssClass: 'estilo-alertas'
              });
              await alert.present();
            }
          } else{
            const alert = await this.alertController.create({
              header: 'Error al iniciar sesión',
              message: 'Usuario o contraseña incorrectos, por favor intente de nuevo.',
              buttons: ['OK'],
              cssClass: 'estilo-alertas'
            });
            await alert.present();
          }
        } catch (error) {

          // Si ocurre algún error (en Firebase o en la base de datos)
          const alert = await this.alertController.create({
            header: 'Error al iniciar sesión',
            message: 'Usuario o contraseña incorrectos, por favor intente de nuevo.',
            buttons: ['OK'],
            cssClass: 'estilo-alertas'
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

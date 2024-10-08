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
  ) {}

  async irPagina() {
    // Validación de campos vacíos
    if (!this.correo || !this.contrasena) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    // Validación de formato de correo
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(this.correo)) {
      const alert = await this.alertController.create({
        header: 'Correo inválido',
        message: 'Por favor, ingrese un correo electrónico válido.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    // Validación de la contraseña
    if (this.contrasena.length < 6 || this.contrasena.length > 12) {
      const alert = await this.alertController.create({
        header: 'Contraseña inválida',
        message: 'La contraseña debe tener entre 6 y 12 caracteres.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    if (!/(?=.*[A-Z])/.test(this.contrasena)) {
      const alert = await this.alertController.create({
        header: 'Contraseña inválida',
        message: 'La contraseña debe contener al menos una letra mayúscula.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    if (!/(?=.*[a-z])/.test(this.contrasena)) {
      const alert = await this.alertController.create({
        header: 'Contraseña inválida',
        message: 'La contraseña debe contener al menos una letra minúscula.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    if (!/(?=.*\d)/.test(this.contrasena)) {
      const alert = await this.alertController.create({
        header: 'Contraseña inválida',
        message: 'La contraseña debe contener al menos un número.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    // Lógica de autenticación
    try {
      let BuscarUsuario = await this.bd.Login(this.correo, this.contrasena);

      if (BuscarUsuario) {
        await this.storage.setItem('usuario', {
          idusuario: BuscarUsuario.idusuario,
        });
        this.router.navigate(['/habitaciones']);
      } else if (this.correo === 'admin@gmail.com' && this.contrasena === 'Admin123') {
        this.router.navigate(['/administrador']);
      } else {
        const alert = await this.alertController.create({
          header: 'Error de autenticación',
          message: 'Correo o contraseña incorrectos.',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtelo de nuevo.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      console.error('Error al iniciar sesión:', error);
    }
  }

  ngOnInit() {
    this.menu.enable(false);
  }
}

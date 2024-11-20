import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BdService } from 'src/app/service/servicios/bd.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/servicios/auth.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage {
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  contrasenaActual: string = '';
  idusuario: number = 0; // Debe obtenerse correctamente del estado o la sesión.
  errorMessage: string = '';
  correo:string="";

  constructor(
    private authService: AuthService,
    private bd: BdService,
    private alertCtrl: AlertController,
    private router: Router,
  ) {    
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.idusuario = navigation.extras.state['idusuario'];
      this.correo = navigation.extras.state['correo']
    }
  }

  async validarContrasena(contrasena: string): Promise<boolean> {
    if (contrasena.length < 6 || contrasena.length > 12) {
      this.errorMessage = 'La contraseña debe tener entre 6 y 12 caracteres.';
      await this.presentAlert('Contraseña inválida', this.errorMessage);
      return false;
    }

    if (!/(?=.*[A-Z])/.test(contrasena)) {
      this.errorMessage = 'La contraseña debe contener al menos una letra mayúscula.';
      await this.presentAlert('Contraseña inválida', this.errorMessage);
      return false;
    }

    if (!/(?=.*[a-z])/.test(contrasena)) {
      this.errorMessage = 'La contraseña debe contener al menos una letra minúscula.';
      await this.presentAlert('Contraseña inválida', this.errorMessage);
      return false;
    }

    if (!/(?=.*\d)/.test(contrasena)) {
      this.errorMessage = 'La contraseña debe contener al menos un número.';
      await this.presentAlert('Contraseña inválida', this.errorMessage);
      return false;
    }

    return true;
  }

  async cambiarContrasena() {
    if (!this.contrasenaActual || !this.nuevaContrasena || !this.confirmarContrasena) {
      await this.presentAlert('Error', 'Por favor, rellene todos los campos.');
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      await this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    const contrasenaValida = await this.validarContrasena(this.nuevaContrasena);
    if (!contrasenaValida) {
      return;
    }

    try {
      const usuario = await this.bd.BuscarUsu(this.idusuario);
      if (!usuario || usuario.contrasena !== this.contrasenaActual) {
        await this.presentAlert('Error', 'La contraseña actual es incorrecta.');
        return;
      }

      await this.bd.modificarContra(this.nuevaContrasena, this.idusuario);
      await this.authService.cambiarContrasena(this.nuevaContrasena,this.correo)
      await this.presentAlert('Éxito', 'La contraseña se ha cambiado correctamente.');
      this.router.navigate(['/miperfil']);
    } catch (error) {
      console.error(error);
      await this.presentAlert('Error', 'No se pudo cambiar la contraseña. Intente nuevamente.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

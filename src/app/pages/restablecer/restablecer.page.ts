import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/service/servicios/auth.service';
import { BdService } from 'src/app/service/servicios/bd.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  correo: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private menu: MenuController,
    private auth: AuthService,
    private bd: BdService
  ) {}

  async irPagina() {
    if (!this.correo) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(this.correo)) {
      const alert = await this.alertController.create({
        header: 'Correo invalido',
        message: 'Por favor, ingrese un correo electrónico valido.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else {
      const usuario = await this.bd.BuscarUsuC(this.correo);
      
      if (!usuario) {
        await this.alerta('El correo no está registrado en nuestro sistema.');
        return;
      }
  
      const existeEnFirebase = await this.auth.verificarCorreoEnFirebase(this.correo);
      
      if (existeEnFirebase) {
        await this.recuperarContrasena();

      } else {
        await this.alerta('El correo no está registrado en nuestro sistema.');
      }
    }
  }
  

  async alerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  async recuperarContrasena() {
      await this.auth.resetAuth(this.correo);
      const alert = await this.alertController.create({
        header: 'Correo enviado',
        message: 'Por favor, Siga las instrucciones que le enviamos al correo',
        buttons: ['Aceptar'],
      });
      await alert.present();
  }

  ngOnInit() {
    this.menu.enable(false);
  }
}

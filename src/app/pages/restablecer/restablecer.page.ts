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
  errorMessage:string="";
  constructor(
    private router: Router,
    private alertController: AlertController,
    private menu: MenuController,
    private auth: AuthService,
    private bd: BdService
  ) {}

  async irPagina() {
    if (!this.correo) {
      // Verificar si el campo de correo está vacío
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return; // Salir de la función si no hay correo
    }
  
    if (!this.validarCorreoc(this.correo)) {
      this.errorMessage = "El correo debe contener @";
      await this.alerta(this.errorMessage);
      return; 
    }
  
    try {
      const usuario = await this.bd.BuscarUsuC(this.correo);
  
      if (!usuario) {
        await this.alerta('El correo no está registrado en nuestra base de datos.');
        return; // Salir si no existe el correo en la base de datos
      }else{
        await this.auth.resetAuth(this.correo);
        await this.alerta('Correo Enviado Correctamente');

      }
    } catch (error) {
      // Manejo de errores
      console.error('Error en el proceso de recuperación:', error);
      await this.alerta('Ocurrió un error al procesar su solicitud. Intente nuevamente más tarde.');
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
  
  validarCorreoc(correo: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
  }

  ngOnInit() {
    this.menu.enable(false);
  }
}

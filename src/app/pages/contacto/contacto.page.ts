import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  nombre: string = "";
  correo: string = "";
  mensaje: string = "";
  telefono: string = "";

  constructor(
    private menu: MenuController,
    private alertController: AlertController,
    private router: Router
  ) { }

  async enviar() {
    if (!this.nombre || !this.correo || !this.mensaje || !this.telefono) {
      const alert = await this.alertController.create({
        header: 'Campos Vacios',
        message: 'Por favor, completa todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else if (this.nombre.length < 6 || this.nombre.length > 20) {
      const alert = await this.alertController.create({
        header: 'Nombre Invalido',
        message: 'El nombre debe tener entre 6 y 20 caracteres.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else if (!this.correo.includes('@gmail.com')) {
      const alert = await this.alertController.create({
        header: 'Correo Electronico Invalido',
        message: 'Por favor, ingrese un correo electronico valido.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else if (this.telefono.length != 9 || isNaN(Number(this.telefono))) {
      const alert = await this.alertController.create({
        header: 'Telefono Invalido',
        message: 'El telefono debe tener 9 digitos numericos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Contacto Enviado',
        message: 'Tu mensaje ha sido enviado correctamente.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      this.router.navigate(['/habitaciones']);
    }
  }

  ngOnInit() {
    this.menu.enable(false);
  }
}

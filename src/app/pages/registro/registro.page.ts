import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  rut: string = "";
  nombre: string = "";
  usuario: string = "";
  contrasena: string = "";

  constructor(private router: Router, private menu: MenuController, private alertController: AlertController) {}

  async irPagina() {
    if (!this.usuario || !this.contrasena || !this.nombre || !this.rut) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } 
    else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(this.usuario)) {
      const alert = await this.alertController.create({
        header: 'Correo invalido',
        message: 'Por favor, ingrese un correo electronico valido',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    else if (!/^[0-9]+[-]{1}[0-9kK]{1}$/.test(this.rut)) {
      const alert = await this.alertController.create({
        header: 'RUT invalido',
        message: 'El RUT debe estar en el formato "XXXXXXXX-X"',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } 
    else if (this.nombre.trim().length == 0) {
      const alert = await this.alertController.create({
        header: 'Nombre invalido',
        message: 'El nombre no puede estar vacio.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } 
    else if (this.contrasena.length < 6 || this.contrasena.length > 12) {
      const alert = await this.alertController.create({
        header: 'Contraseña invalida',
        message: 'La contraseña debe tener entre 6 y 12 caracteres.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    else if (!/(?=.*[A-Z])/.test(this.contrasena)) {
      const alert = await this.alertController.create({
        header: 'Contraseña invalida',
        message: 'La contraseña debe contener al menos una letra mayuscula.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    else if (!/(?=.*[a-z])/.test(this.contrasena)) {
      const alert = await this.alertController.create({
        header: 'Contraseña invalida',
        message: 'La contraseña debe contener al menos una letra minuscula.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }

    else if (!/(?=.*\d)/.test(this.contrasena)) {
      const alert = await this.alertController.create({
        header: 'Contraseña invalida',
        message: 'La contraseña debe contener al menos un numero.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    else {
      const alert = await this.alertController.create({
        header: 'Cuanta Creada Correctamente',
        buttons: ['Aceptar'],
      });
      await alert.present();

      let navigationExtras: NavigationExtras = {
        state: {
          usu: this.usuario,
          con: this.contrasena,
        }
      };

      if (this.usuario == "administrador@gmail.com" && this.contrasena == "12345") {
        this.router.navigate(['/administrador'], navigationExtras);
      } else {
        this.router.navigate(['/home'], navigationExtras);
      }
    }
  }

  ngOnInit() {
    this.menu.enable(false);
  }
}

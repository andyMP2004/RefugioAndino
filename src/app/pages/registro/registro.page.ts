import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  rut:string="";
  nombre:string= "";
  usuario: string = "";
  contrasena: string = "";
  constructor(private router: Router,private menu: MenuController, private alertController: AlertController) { }
  async irPagina() {
    if (!this.usuario || !this.contrasena || !this.nombre || !this.rut) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } 
    else if (this.usuario.length < 6 || this.usuario.length > 20 || !this.usuario.includes('@gmail.com')) {
      const alert = await this.alertController.create({
        header: 'Por favor complete correctamente los datos',
        message: 'El correo electrónico debe tener entre 6 y 20 caracteres y contener "@"',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }else if (this.rut.length<7 || this.rut.length>9) {
      const alert = await this.alertController.create({
        header: 'RUT invalido',
        message: 'El rut debe tener entre 7 y 9 caracteres',
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
    }else if (this.contrasena.length<=6 || this.contrasena.length>=12){
      const alert = await this.alertController.create({
        header: 'contraseña invalida',
        message: 'la contraseña debe tener entre 6 y 12 caracteres',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }else {
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

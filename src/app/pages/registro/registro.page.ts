import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  idusuario: string= "";
  nombre: string = "";
  rut: string = "";
  correo: string = "";
  contrasena: string = "";
  fechan: string= "";
  telefono: string = "";
  idrol: string = "";

  constructor(private router: Router, private menu: MenuController, private alertController: AlertController, private storage: NativeStorage,private bd: BdService ) {}

  async irPagina() {
    if (!this.correo || !this.contrasena || !this.nombre || !this.rut) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } 
    else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(this.correo)) {
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

      if (this.correo == "administrador@gmail.com" && this.contrasena == "Admin123") {
        this.router.navigate(['/administrador']);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  async crear() {
    const usuarioData = {
      rut: this.rut,
      nombre: this.nombre,
      usuario: this.correo,
      contrasena: this.contrasena
    };
  
    this.storage.setItem('usuario', usuarioData)
      const alert = await this.alertController.create({
      header: 'Cuanta Creada Correctamente',
      buttons: ['Aceptar'],
    });
      await alert.present();
  }
  insertar(){
    this.bd.insertarUsuario(this.nombre, this.rut,this.fechan,this.telefono,this.correo,this.contrasena,this.idrol);
  }
}//idusuario, nombreusuario, correo, rutusuario, contrasena, fechan, telefono, idrol

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';
import { AuthService } from 'src/app/service/servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  idusuario: string = "";
  nombre: string = "";
  rutusuario: string = "";
  correo: string = "";
  contrasena: string = "";
  repetirContrasena: string = "";  // Nueva variable para la segunda contraseña
  fechan: string = "";
  telefono: string = "";
  idrol: string = "";

  constructor(private router: Router, private menu: MenuController,
     private alertController: AlertController, private storage: NativeStorage, 
     private bd: BdService, private auth: AuthService) {
    this.fechan = new Date().toISOString().split('T')[0];
  }

  async irPagina() {
    if (!this.correo || !this.contrasena || !this.nombre || !this.rutusuario || !this.repetirContrasena) {
      await this.presentAlert('Los datos no pueden estar vacíos', 'Por favor, complete todos los datos');
      return;
    } 

    if (this.contrasena !== this.repetirContrasena) {
      await this.presentAlert('Error de contraseña', 'Las contraseñas no coinciden');
      return;
    }

    // Validación de correo, RUT, etc.
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(this.correo)) {
      await this.presentAlert('Correo invalido', 'Por favor, ingrese un correo electronico valido');
      return;
    }
    if (!/^[0-9]+[-]{1}[0-9kK]{1}$/.test(this.rutusuario)) {
      await this.presentAlert('RUT invalido', 'El RUT debe estar en el formato "XXXXXXXX-X"');
      return;
    } 
    if (this.contrasena.length < 6 || this.contrasena.length > 12) {
      await this.presentAlert('Contraseña invalida', 'La contraseña debe tener entre 6 y 12 caracteres.');
      return;
    }
    if (!/(?=.*[A-Z])/.test(this.contrasena)) {
      await this.presentAlert('Contraseña invalida', 'La contraseña debe contener al menos una letra mayuscula.');
      return;
    }
    if (!/(?=.*[a-z])/.test(this.contrasena)) {
      await this.presentAlert('Contraseña invalida', 'La contraseña debe contener al menos una letra minuscula.');
      return;
    }
    if (!/(?=.*\d)/.test(this.contrasena)) {
      await this.presentAlert('Contraseña invalida', 'La contraseña debe contener al menos un numero.');
      return;
    }
    if (!this.validarEdad(this.fechan)) {
      await this.presentAlert("Error", "Debes ser mayor de 18 años para registrarte.");
      return;
    }

    // Si las validaciones pasan, inserta en la base de datos
    await this.insertar(); 
    await this.presentAlert('Cuenta Creada Correctamente', '');
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  async crear() {
    const usuarioData = {
      rut: this.rutusuario,
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

  async insertar() {
    this.auth.registro(this.correo, this.contrasena); // Se guarda la contraseña
    const fechaSinHora = this.fechan.split('T')[0]; 
    await this.bd.insertarUsuario(this.nombre, this.rutusuario, this.correo, this.contrasena, fechaSinHora, this.telefono, '', this.idrol);
  }

  validarEdad(fecha: string): boolean {
    const fechaNacimiento = new Date(fecha);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    return edad > 18 || (edad === 18 && new Date().getTime() >= fechaNacimiento.getTime());
  }
  
}

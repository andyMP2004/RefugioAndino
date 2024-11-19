import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  idusuario: string = '';
  nombre: string = '';
  rutusuario: string = '';
  correo: string = '';
  contrasena: string = '';
  repetirContrasena: string = '';
  fechan: string = '';
  telefono: string = '';
  rolidrol: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private menu: MenuController,
    private alertController: AlertController,
    private storage: NativeStorage,
    private bd: BdService,
    private auth: AuthService
  ) {
    this.fechan = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  async validarContrasena(contrasena: string): Promise<boolean> {
    if (contrasena.length < 6 || contrasena.length > 12) {
      this.errorMessage = 'La contraseña debe tener entre 6 y 12 caracteres.';
      await this.presentAlert('Contraseña invalida', this.errorMessage);
      return false;
    }

    if (!/(?=.*[A-Z])/.test(contrasena)) {
      this.errorMessage = 'La contraseña debe contener al menos una letra mayúscula.';
      await this.presentAlert('Contraseña invalida', this.errorMessage);
      return false;
    }

    if (!/(?=.*[a-z])/.test(contrasena)) {
      this.errorMessage = 'La contraseña debe contener al menos una letra minúscula.';
      await this.presentAlert('Contraseña invalida', this.errorMessage);
      return false;
    }

    if (!/(?=.*\d)/.test(contrasena)) {
      this.errorMessage = 'La contraseña debe contener al menos un número.';
      await this.presentAlert('Contraseña invalida', this.errorMessage);
      return false;
    }

    return true;
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

    const contrasenaValida = await this.validarContrasena(this.contrasena);
    if (!contrasenaValida) {
      return; 
    }

    if (!/^[0-9]+[-]{1}[0-9kK]{1}$/.test(this.rutusuario)) {
      this.errorMessage = 'El RUT debe estar en el formato "XXXXXXXX-X"';
      await this.presentAlert('RUT invalido', this.errorMessage);
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.correo)) {
      await this.presentAlert('Correo inválido', 'Por favor, ingrese un correo electrónico válido');
      return;
    }
    
    if (!this.validarEdad(this.fechan)) {
      await this.presentAlert('Error', 'Debes ser mayor de 18 años para registrarte.');
      return;
    }
    if (!this.validarTelefono(this.telefono)) {
      await this.presentAlert('Error', 'Solamente se deben ingresar números');
      return;
    }    
    await this.insertar();
    this.router.navigate(['/home']);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  async insertar() {
    this.auth.registro(this.correo, this.contrasena);
    const fechaSinHora = this.fechan.split('T')[0];
    await this.bd.insertarUsuario(this.nombre,this.rutusuario,this.correo,this.contrasena,fechaSinHora,this.telefono,'');
  }

  validarEdad(fecha: string): boolean {
    const fechaNacimiento = new Date(fecha);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    return edad > 18 || (edad === 18 && new Date().getTime() >= fechaNacimiento.getTime());
  }

  async validarRut(rut: string): Promise<void> {
    if (!/^[0-9]+[-]{1}[0-9kK]{1}$/.test(rut)) {
      await this.presentAlert('RUT invalido', 'El RUT debe estar en el formato "XXXXXXXX-X"');
      this.rutusuario = '';
    }
  }

  validarTelefono(telefono: string): boolean {
    const soloNumeros = telefono.replace(/\D/g, '');
    this.telefono = soloNumeros.slice(0, 9);
    return soloNumeros.length == telefono.length; 
  }
  
  
}

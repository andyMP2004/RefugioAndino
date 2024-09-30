import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  nombre: string = "";
  usuario: string = "";
  rut: string = "";

  constructor(
    private router: Router,
    private activedrouter: ActivatedRoute,
    private menu: MenuController,
    private storage: NativeStorage,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.menu.enable(false);
    this.cargarDatos();
  }

  async cargarDatos() {
    try {
      const usuarioData = await this.storage.getItem('usuario');
      this.nombre = usuarioData.nombre;
      this.usuario = usuarioData.usuario;
      this.rut = usuarioData.rut;
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudieron cargar los datos del usuario.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { BdService } from 'src/app/service/servicios/bd.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  idusuario: string = "";
  nombreusuario: string = "";
  rutusuario: string = "";
  correo: string = "";
  telefono: string = "";
  imagenp: any = "";
  contrasena: string = "";
  arreglousuario: any = []; 

  constructor(
    private router: Router,
    private activedrouter: ActivatedRoute,
    private menu: MenuController,
    private storage: NativeStorage,
    private alertController: AlertController,
    private bd: BdService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.menu.enable(false);

    this.storage.getItem('usuario').then((data) => {
      const idusuario = data; 
      this.bd.BuscarUsu(idusuario).then((usuario) => {
        if (usuario) {
          this.arreglousuario = [usuario]; 
          this.idusuario = usuario.idusuario;
          this.nombreusuario = usuario.nombreusuario;
          this.rutusuario = usuario.rutusuario;
          this.correo = usuario.correo;
          this.telefono = usuario.telefono;
          this.imagenp = usuario.imagen || '';

          this.cdr.detectChanges();
        }
      })
    })
  }

  tomarFoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.imagenp = 'data:image/jpeg;base64,' + image.base64String;
    this.bd.ModificarUsuario(this.idusuario, this.nombreusuario, this.correo, this.contrasena, this.telefono, this.imagenp);

    this.cdr.detectChanges();
  };
}

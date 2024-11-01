import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { BdService } from 'src/app/service/servicios/bd.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/service/servicios/auth.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  idusuario!: number;
  nombreusuario: string = "";
  rutusuario: string = "";
  correo: string = "";
  telefono: string = "";
  imagenp: any = "";
  contrasena: string = "";
  arreglousuario: any = []; 
  editando: boolean = false; 

  constructor(
    private router: Router,
    private activedrouter: ActivatedRoute,
    private menu: MenuController,
    private storage: NativeStorage,
    private alertController: AlertController,
    private bd: BdService,
    private cdr: ChangeDetectorRef, 
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.menu.enable(false);
  
    this.storage.getItem('usuario').then((data) => {
      const idusuario = data; 
      this.cargarUsuario(idusuario);{

      }
    });
  }
  
  cargarUsuario(idusuario: number) {
    this.bd.BuscarUsu(idusuario).then((usuario) => {
      if (usuario) {
        this.arreglousuario = [usuario]; 
        this.idusuario = usuario.idusuario;
        this.nombreusuario = usuario.nombreusuario;
        this.rutusuario = usuario.rutusuario;
        this.correo = usuario.correo;
        this.telefono = usuario.telefono;
        this.imagenp = usuario.imagenp || '';
  
        this.cdr.detectChanges();
      }
    });
  }

  guardarCambios() {
    if (this.editando) {
      this.bd.ModificarUsuario(this.idusuario, this.nombreusuario, this.correo, this.telefono, this.imagenp).then(() => {
        this.cargarUsuario(this.idusuario);
      });
    }
    this.editando = !this.editando;
  }
  
  tomarFoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.imagenp = 'data:image/jpeg;base64,' + image.base64String;
    this.bd.ModificarUsuario(this.idusuario, this.nombreusuario, this.correo, this.telefono, this.imagenp);

    this.cdr.detectChanges();
  };
}

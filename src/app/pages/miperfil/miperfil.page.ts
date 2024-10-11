import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { BdService } from 'src/app/service/servicios/bd.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ChangeDetectorRef} from '@angular/core';

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
    this.bd.dbState().subscribe(res => {
      if (res) {
      this.bd.BuscarUsu(this.idusuario, this.nombreusuario, this.correo,this.contrasena, this.telefono, this.imagenp);
      }
    });
  }


  tomarFoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imagenp = 'data:image/jpeg;base64,' + image.base64String;
    this.bd.ModificarUsuario(this.idusuario, this.nombreusuario, this.correo,this.contrasena, this.telefono, this.imagenp);

    this.cdr.detectChanges();
  };
  
}

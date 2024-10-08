import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { BdService } from 'src/app/service/servicios/bd.service';
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

  arreglousuario: any = [
    {
      idusuario: '',
      nombreusuario: '',
      rutusuario: '',
      correo: '',
      telefono: ''
    }
  ];


  constructor(
    private router: Router,
    private activedrouter: ActivatedRoute,
    private menu: MenuController,
    private storage: NativeStorage,
    private alertController: AlertController,
    private bd: BdService
  ) {}

  ngOnInit() {
    this.menu.enable(false);
    this.bd.dbState().subscribe(res => {
      this.arreglousuario = res;
      if (res) {
        this.bd.fetchUsuario().subscribe(users => {
          this.arreglousuario = users;
        });
      }
    });
  }

  
}

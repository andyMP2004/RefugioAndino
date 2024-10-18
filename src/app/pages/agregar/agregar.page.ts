import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController, MenuController } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  descripcion: string = "";
  nombre: string="";
  precio: string="";
  imagen:string="";
  idtipo!: number;
  constructor(private menu: MenuController, private router: Router, private alertController: AlertController,private bd: BdService) {}
  private valor(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  async agregar() {
    if (  !this.idtipo) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else{

      this.bd.insertahabi(this.idtipo);
    }
  }

  ngOnInit() {
    this.menu.enable(false);
  }
  
}

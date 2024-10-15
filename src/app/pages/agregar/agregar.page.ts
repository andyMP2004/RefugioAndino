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
  constructor(private menu: MenuController, private router: Router, private alertController: AlertController,private bd: BdService) {}
  private valor(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  async agregar() {
    if (!this.descripcion || !this.nombre || !this.precio) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else if (this.descripcion.length <6 || this.descripcion.length >50  || !/^[^\d]*$/.test(this.descripcion)) {
      const alert = await this.alertController.create({
        header: 'La descripción debe tener entre 6 y 50 caracteres',
        message: 'Por favor, intente nuevamente',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else if (this.nombre.length <6 || this.descripcion.length >50  || !/^[^\d]*$/.test(this.nombre)) {
      const alert = await this.alertController.create({
        header: 'El nombre debe tener entre 6 y 20 caracteres',
        message: 'Por favor, intente nuevamente',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }else if (!this.imagen) {
      const alert = await this.alertController.create({
        header: 'La imagen es necesaria',
        message: 'Por favor, seleccione una imagen antes de continuar',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }else{
      this.tomarFoto();

      this.bd.insertahabi(this.nombre, this.imagen,this.precio, this.descripcion);
    }
  }

  ngOnInit() {
    this.menu.enable(false);
  }
  tomarFoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.imagen = 'data:image/jpeg;base64,' + image.base64String;
  };
}

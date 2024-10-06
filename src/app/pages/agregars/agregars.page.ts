import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-agregars',
  templateUrl: './agregars.page.html',
  styleUrls: ['./agregars.page.scss'],
})
export class AgregarsPage implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;
  descripcion: string = "";
  nombre: string="";
  precio: string="";
  constructor(private menu: MenuController, private router: Router, private alertController: AlertController) {}

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
    }else if (isNaN(Number(this.precio)) || Number(this.precio) < 5000 || Number(this.precio) > 100000) {
      const alert = await this.alertController.create({
        header: 'El precio debe ser un número entre 5000 y 100000',
        message: 'Por favor, ingrese un valor valido.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }else if (!this.selectedImage) {
      const alert = await this.alertController.create({
        header: 'La imagen es necesaria',
        message: 'Por favor, seleccione una imagen antes de continuar',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedImage = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

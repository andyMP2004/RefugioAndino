import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;
  camas: string = "";
  banos: string = "";

  constructor(private menu: MenuController, private router: Router, private alertController: AlertController) {}

  async agregar() {
    if (!this.camas || !this.banos) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else if (this.camas.length < 6 || this.camas.length > 50 || !/^[^\d]*$/.test(this.camas)) {
      const alert = await this.alertController.create({
        header: 'La descripción debe tener entre 6 y 50 caracteres y no puede contener números negativos',
        message: 'Por favor, intente nuevamente',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else if (this.banos.length < 6 || this.banos.length > 50 || !/^[^\d]*$/.test(this.banos)) {
      const alert = await this.alertController.create({
        header: 'La descripción debe tener entre 6 y 50 caracteres y no puede contener números negativos',
        message: 'Por favor, intente nuevamente',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else if (!this.selectedImage) {
      const alert = await this.alertController.create({
        header: 'La imagen es necesaria',
        message: 'Por favor, seleccione una imagen antes de continuar',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else {
      let navigationExtras: NavigationExtras = {
        state: {
          cam: this.camas,
          ban: this.banos,
          img: this.selectedImage, // Incluye la imagen en la navegación
        }
      };
      this.router.navigate(['/hfamiliar'], navigationExtras);
    }
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedImage = reader.result; // Asegúrate de que esto sea el tipo correcto
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

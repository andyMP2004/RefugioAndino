import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.page.html',
  styleUrls: ['./habitaciones.page.scss'],
})
export class HabitacionesPage {
  rating: number | undefined;

  constructor(private alertController: AlertController) {}

  async submitFeedback() {
    // Aquí podrías enviar el feedback a un servidor o almacenarlo
    const alert = await this.alertController.create({
      header: 'Gracias',
      message: 'Tu opinión ha sido enviada.',
      buttons: ['OK']
    });

    await alert.present();
  }
}

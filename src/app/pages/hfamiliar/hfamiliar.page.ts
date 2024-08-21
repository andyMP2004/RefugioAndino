import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-hfamiliar',
  templateUrl: './hfamiliar.page.html',
  styleUrls: ['./hfamiliar.page.scss'],
})
export class HfamiliarPage implements OnInit {
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  public alertInputs = [
    {
      name: 'camas',
      type: 'text',
      placeholder: 'Camas',
      value: 'Camas: 2',
      attributes: { readonly: true },
    },
    {
      name: 'banos',
      type: 'text', 
      placeholder: 'Baños',
      value: 'Baños: 2',
      attributes: { readonly: true },
    },
  ];

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  async mostrarInfo(info: string) {
    const alert = await this.alertController.create({
      header: 'Información de la Habitación',
      message: 'Aquí puedes ver los detalles sobre la habitación seleccionada.',
      inputs: this.alertInputs.map(input => ({
        ...input,
        type: input.type as 'text' | 'textarea' | 'password' | 'number' | 'email', 
      })),
      buttons: this.alertButtons,
      cssClass: 'alerta',
    });

    await alert.present();
  }
}

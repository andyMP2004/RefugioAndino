import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.page.html',
  styleUrls: ['./habitaciones.page.scss'],
})
export class HabitacionesPage implements OnInit {

  constructor(private alertController: AlertController) {}

  mostrarInfo(tipoHabitacion: string) {
    let mensaje = '';

    if (tipoHabitacion === 'Habitación Deluxe') {
      mensaje = 'Amplia y lujosa habitación con vistas al mar, equipada con una cama king size y baño privado.';
    } else if (tipoHabitacion === 'Habitación Familiar') {
      mensaje = 'Espaciosa habitación perfecta para familias, con dos camas dobles y un área de estar.';
    } else if (tipoHabitacion === 'Suite Presidencial') {
      mensaje = 'Suite de lujo con sala de estar, comedor, jacuzzi y vistas panorámicas a la ciudad.';
    }

    this.alertController.create({
      header: tipoHabitacion,
      message: mensaje,
      buttons: ['OK']
    }).then(alert => {
      alert.present();
    });
  }

  ngOnInit() {
  }

}

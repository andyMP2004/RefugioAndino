import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  habitacion: string = "";
  huesped: string = "";
  fecha: string = "";
  idreserva: string = "";
  usuarioidusuario: string = "";
  noches: number = 0;

  constructor(
    private menu: MenuController,
    private router: Router,
    private alertController: AlertController,
    private bd: BdService,
    private storage: NativeStorage
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const reserva = navigation.extras.state['reserva'];
      if (reserva) {
        this.idreserva = reserva.idreserva;
        this.fecha = reserva.fecha;
        this.usuarioidusuario = reserva.usuarioidusuario;
      }
    }
  }

  async reservar() {
    if (!this.fecha) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else {
      const fechaSinHora = this.fecha.split('T')[0]; 
      this.bd.modificarReserva(fechaSinHora, this.idreserva);
      const alert = await this.alertController.create({
        header: 'Reserva confirmada',
        buttons: ['Aceptar'],
      });
      await alert.present();    
      this.router.navigate(['/habitaciones']);
    }
  }

  ngOnInit() {    
    this.menu.enable(false);
  }
}

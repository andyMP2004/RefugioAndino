import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  arregloreserva: any[] = []; 

  constructor(private menu: MenuController, private bd: BdService, private router: Router, private storage: NativeStorage) {}

  ngOnInit() {
    this.menu.enable(false);
    this.storage.getItem('usuario').then((idusuario) => {
      this.bd.dbState().subscribe(res => {
        if (res) {
          this.bd.ReservaPorUsuario(idusuario).then(reservas => { 
            this.arregloreserva = reservas;
          });
        }
      });
    }).catch(e => {
      console.error('Error al obtener el ID de usuario:', e);
    });
  }

  eliminar(reserva: any) {
    this.bd.eliminarReserva(reserva.idreserva).then(() => {
      this.ngOnInit(); 
    });
  }

  modificar(reserva: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        reserva: {
          idreserva: reserva.idreserva,
          fecha: reserva.fecha,
          usuarioidusuario: reserva.usuarioidusuario,
        }
      }
    };
    this.router.navigate(['/modificar'], navigationExtras);
  }
}

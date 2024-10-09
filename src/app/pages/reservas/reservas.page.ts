import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';
import { Reserva } from 'src/app/service/servicios/reserva';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  arregloreserva: any = [
    {
      idreserva: '',
      fecha: '',
      total: '',
      usuarioidusuario: ''
    }
  ];

  constructor(private menu: MenuController, private bd: BdService, private router: Router) {}

  ngOnInit() {
    this.menu.enable(false);
    this.bd.dbState().subscribe(res => {
      this.arregloreserva = res;
      if (res) {
          this.bd.fetchReserva().subscribe(users => {
            this.arregloreserva = users;
          });
      }
    });
  }
  eliminar(x:any){
    this.bd.eliminarReserva(x.idreserva);
  }
}

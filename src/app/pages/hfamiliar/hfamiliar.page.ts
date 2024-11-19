import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';

@Component({
  selector: 'app-hfamiliar',
  templateUrl: './hfamiliar.page.html',
  styleUrls: ['./hfamiliar.page.scss'],
})
export class HfamiliarPage implements OnInit {
  idtipo: string = '';
  nombre: string = '';
  imagen: string = '';
  precio: string = '';
  descripcion: string = '';

  habitacion: any[] = [];
  

  constructor(private menu: MenuController, private bd: BdService, private router: Router) {}

  ngOnInit() {
    this.menu.enable(false);
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.loadHabitaciones();
      }
    });
  }

  ionViewWillEnter() {
    this.menu.enable(false);
    this.loadHabitaciones();
  }

  loadHabitaciones() {
    this.bd.ListarHabi().then(() => {
      this.bd.fetchHabitacion().subscribe(habitaciones => {
        this.habitacion = habitaciones;
      });
    }).catch(error => {
      console.error("Error al cargar las habitaciones:", error);
    });
  }
  irReservar(idhabitacion: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        id: idhabitacion
      }
    };
    this.router.navigate(['/reserva'], navigationExtras);
  }

}

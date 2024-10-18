import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';

@Component({
  selector: 'app-hsuite',
  templateUrl: './hsuite.page.html',
  styleUrls: ['./hsuite.page.scss'],
})
export class HsuitePage implements OnInit {
  idtipo: string = '';
  nombre: string = '';
  imagen: string = '';
  precio: string = '';
  descripcion: string = '';

  habitacions: any[] = [];

  constructor(
    private menu: MenuController,
    private bd: BdService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.loadHabitaciones();
      }
    });
  }

  ionViewWillEnter() {
    this.loadHabitaciones();
    this.menu.enable(true);
  }

  loadHabitaciones() {
    this.bd.ListarHabis().then(() => {
      this.bd.fetchHabitacion().subscribe(habitacions => {
        this.habitacions = habitacions;
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
    this.router.navigate(['/reserva-suite'], navigationExtras);
  }
}

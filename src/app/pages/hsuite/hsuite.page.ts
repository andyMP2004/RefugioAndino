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

  // Inicializamos la variable habitacions como un array vacío
  habitacions: any[] = [];

  constructor(
    private menu: MenuController,
    private bd: BdService,
    private router: Router
  ) {}

  ngOnInit() {
    // Nos suscribimos al estado de la base de datos y verificamos que esté lista
    this.bd.dbState().subscribe(res => {
      if (res) {
        // Si la base de datos está lista, cargamos las habitaciones
        this.loadHabitaciones();
      }
    });
  }

  ionViewWillEnter() {
    // Cargamos los datos cada vez que la página se vuelve a mostrar
    this.loadHabitaciones();
    this.menu.enable(true);
  }

  // Método para cargar las habitaciones desde la base de datos
  loadHabitaciones() {
    this.bd.ListarHabis().then(() => {
      this.bd.fetchHabitacion().subscribe(habitacions => {
        // Asignamos las habitaciones obtenidas desde el observable
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

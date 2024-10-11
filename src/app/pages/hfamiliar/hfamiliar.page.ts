import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.loadHabitaciones();
      }
    });
  }

  ionViewWillEnter() {
    this.loadHabitaciones();
  }

  loadHabitaciones() {
    this.bd.ListarHabi().then(() => {
      this.bd.fetchTipo().subscribe(habitaciones => {
        this.habitacion = habitaciones;
      });
    }).catch(error => {
      console.error("Error al cargar las habitaciones:", error);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';

@Component({
  selector: 'app-hpresidencial',
  templateUrl: './hpresidencial.page.html',
  styleUrls: ['./hpresidencial.page.scss'],
})
export class HpresidencialPage implements OnInit {
  idtipo: string = '';
  nombre: string = '';
  imagen: string = '';
  precio: string = '';
  descripcion: string = '';

  habitaciones: any = [
    {
      idhabitacion: '',
      idtipo: '',
      nombre: '',
      imagen: '',
      precio: '',
      descripcion: ''
    }
  ];

  constructor(private menu: MenuController, private bd: BdService, private router: Router) {
    this.bd.dbState().subscribe(res => {
      if (res) {
        // Llamar a ListarHabip para obtener las habitaciones de tipo "Suite Presidencial"
        this.bd.ListarHabip().then(() => {
          this.bd.fetchHabitacion().subscribe(habitaciones => {
            this.habitaciones = habitaciones;
          });
        });
      }
    });
  }

  ngOnInit() {
    
  }
  ionViewWillEnter() {
    this.menu.enable(true);
  }

  irReservar(idhabitacion: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        id: idhabitacion
      }
    };
    this.router.navigate(['/reserva-presidencial'], navigationExtras);


  }
}

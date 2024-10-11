import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      idtipo: '',
      nombre: '',
      imagen: '',
      precio: '',
      descripcion: ''
    }
  ];

  constructor(private menu: MenuController, private bd: BdService, private router: Router) {}

  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if (res) {
        // Llamar a ListarHabip para obtener las habitaciones de tipo "Suite Presidencial"
        this.bd.ListarHabip().then(() => {
          this.bd.fetchTipo().subscribe(habitaciones => {
            this.habitaciones = habitaciones;
          });
        });
      }
    });
  }
  ionViewWillEnter() {
    this.menu.enable(true);
  }
}

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
  idtipo:string="" ;
  nombre:string= "";
  imagen: string="";
  precio: string="";
  descripcion:string= "";

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
    this.menu.enable(false);
    this.bd.dbState().subscribe(res => {
      this.habitaciones = res;
      if (res) {
        this.bd.ListarHabi().then(() => {
          this.bd.fetchTipo().subscribe(habitaciones => {
            this.habitaciones = habitaciones;
          });
        });
      }
    });
  }
}

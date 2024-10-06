import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { identity } from 'rxjs';
import { BdService } from 'src/app/service/servicios/bd.service';
import { Imagen } from 'src/app/service/servicios/imagen';

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
        this.bd.fetchTipo().subscribe(users => {
          this.habitaciones = users;
        });
      }
    });
}
}

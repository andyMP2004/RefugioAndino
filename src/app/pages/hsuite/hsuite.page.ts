import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';

@Component({
  selector: 'app-hsuite',
  templateUrl: './hsuite.page.html',
  styleUrls: ['./hsuite.page.scss'],
})
export class HsuitePage implements OnInit {
  idtipo:string="" ;
  nombre:string= "";
  imagen: string="";
  precio: string="";
  descripcion:string= "";

  habitacions: any = [
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
      this.habitacions = res;
      if (res) {
        this.bd.ListarHabis().then(() => {
          this.bd.fetchTipo().subscribe(habitacions => {
            this.habitacions = habitacions;
          });
        });
      }
    });
  }

}

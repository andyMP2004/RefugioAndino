import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  reservas = [
    {habitacion: 'Suite Familiar', fecha: '2024-08-25',huespedes:'4' },
    {habitacion: 'Suite Presidencial', fecha: '2024-08-26',huespedes:'2' },
    {habitacion: 'Suite', fecha: '2024-08-27',huespedes: '3' } 
  ];


  constructor(private menu: MenuController) { }

  ngOnInit() {this.menu.enable(false);
  }

}

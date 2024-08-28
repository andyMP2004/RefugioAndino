import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  habitacion: string = "Habitacion Deluxe"

  



  constructor(private menu: MenuController) { }

  ngOnInit() {this.menu.enable(false);}

}

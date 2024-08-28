import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-reserva-presidencial',
  templateUrl: './reserva-presidencial.page.html',
  styleUrls: ['./reserva-presidencial.page.scss'],
})
export class ReservaPresidencialPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {this.menu.enable(false);}

}

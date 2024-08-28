import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-reserva-suite',
  templateUrl: './reserva-suite.page.html',
  styleUrls: ['./reserva-suite.page.scss'],
})
export class ReservaSuitePage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {this.menu.enable(false);
  }

}

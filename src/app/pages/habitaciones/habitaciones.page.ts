import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.page.html',
  styleUrls: ['./habitaciones.page.scss'],
})
export class HabitacionesPage {
  rating: number | undefined;

  constructor(private menu:MenuController) {}  

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menu.enable(true);
  }
}

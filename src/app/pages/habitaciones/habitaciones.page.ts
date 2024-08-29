import { Component } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.page.html',
  styleUrls: ['./habitaciones.page.scss'],
})
export class HabitacionesPage {
  rating: number | undefined;

  constructor(private alertController: AlertController,private menu:MenuController) {}  

  ngOnInit() {
    this.menu.enable(true);
  }
}

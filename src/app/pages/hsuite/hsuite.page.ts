import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-hsuite',
  templateUrl: './hsuite.page.html',
  styleUrls: ['./hsuite.page.scss'],
})
export class HsuitePage implements OnInit {
  constructor(private modalController: ModalController, private menu: MenuController) {}
  isModalOpen = false;
  modalContent:any={};

  habitaciones = [
    {
      image: 'assets/suite/suite3.jpg',
      title: 'Habitación Suite',
      descripcion: '1 cama king-size, con opciones adicionales como sofás-camas, Baño grande con bañera, Televisión de pantalla plana',
    },
    {
      image: 'assets/suite/suite3.jpg',
      title: 'Habitación Suite',
      descripcion: '1 cama king-size, con opciones adicionales como sofás-camas, Baño grande con bañera, Televisión de pantalla plana',
    },
    {
      image: 'assets/suite/suite3.jpg',
      title: 'Habitación Suite',
      descripcion: '1 cama king-size, con opciones adicionales como sofás-camas, Baño grande con bañera, Televisión de pantalla plana',
    },
    {
      image: 'assets/suite/suite3.jpg',
      title: 'Habitación Suite',
      descripcion: '1 cama king-size, con opciones adicionales como sofás-camas, Baño grande con bañera, Televisión de pantalla plana',
    },
  ];

  openModal(habitaciones: any) {
    this.modalContent = habitaciones;
    this.isModalOpen = true;
  }
  

  ngOnInit() {this.menu.enable(false);}

}

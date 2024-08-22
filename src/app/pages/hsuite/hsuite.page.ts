import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-hsuite',
  templateUrl: './hsuite.page.html',
  styleUrls: ['./hsuite.page.scss'],
})
export class HsuitePage implements OnInit {
  constructor(private modalController: ModalController) {}
  isModalOpen = false;
  modalContent:any={};

  habitaciones = [
    {
      image: 'assets/suite/suite1.jpg',
      title: 'Habitación Suite',
      camas: '1 cama king-size, con opciones adicionales como sofás-camas',
      banos: 'Baño grande con bañera',
      estar: 'Televisión de pantalla plana'
    },
    {
      image: 'assets/suite/suite2.jpg',
      title: 'Habitación Suite',
      camas: '1 cama king-size, con opciones adicionales como sofás-camas',
      banos: 'Baño grande con bañera',
      estar: 'Televisión de pantalla plana'
    },
    {
      image: 'assets/suite/suite3.jpeg',
      title: 'Habitación Suite',
      camas: '1 cama king-size, con opciones adicionales como sofás-camas',
      banos: 'Baño grande con bañera',
      estar: 'Televisión de pantalla plana'
    },
    {
      image: 'assets/suite/suite4.webp',
      title: 'Habitación Suite',
      camas: '1 cama king-size, con opciones adicionales como sofás-camas',
      banos: 'Baño grande con bañera',
      estar: 'Televisión de pantalla plana'
    }
  ];

  openModal(habitaciones: any) {
    this.modalContent = habitaciones;
    this.isModalOpen = true;
  }
  

  ngOnInit() {}

}

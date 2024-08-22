import { Component, OnInit } from '@angular/core';
import {ModalController } from '@ionic/angular';

@Component({
  selector: 'app-hfamiliar',
  templateUrl: './hfamiliar.page.html',
  styleUrls: ['./hfamiliar.page.scss'],
})
export class HfamiliarPage implements OnInit {

  constructor(private modalController: ModalController) {}
  isModalOpen = false;
  modalContent:any={};

  habitaciones = [
    {
      image: 'assets/familiar/familiar.jpg',
      title: 'Habitación Familiar',
      camas: '1 cama matrimonial y 1 cama individual',
      banos: 'Baño más grande con bañera y ducha',
      estar: 'Espacio adicional con sofás o sillones'
    },
    {
      image: 'assets/familiar/familiar.1.jpg',
      title: 'Habitación Familiar',
      camas: '1 cama matrimonial y 1 cama individual',
      banos: 'Baño más grande con bañera y ducha',
      estar: 'Espacio adicional con sofás o sillones'
    },
    {
      image: 'assets/familiar/familiar.3.jpg',
      title: 'Habitación Familiar',
      camas: '1 cama matrimonial y 1 cama individual',
      banos: 'Baño más grande con bañera y ducha',
      estar: 'Espacio adicional con sofás o sillones'
    },
    {
      image: 'assets/familiar/familiar.4.jpg',
      title: 'Habitación Familiar',
      camas: '1 cama matrimonial y 1 cama individual',
      banos: 'Baño más grande con bañera y ducha',
      estar: 'Espacio adicional con sofás o sillones'
    }
  ];

  openModal(habitaciones: any) {
    this.modalContent = habitaciones;
    this.isModalOpen = true;
  }
  

  ngOnInit() {}

}

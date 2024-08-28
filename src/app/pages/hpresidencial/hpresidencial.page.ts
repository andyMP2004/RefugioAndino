import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-hpresidencial',
  templateUrl: './hpresidencial.page.html',
  styleUrls: ['./hpresidencial.page.scss'],
})
export class HpresidencialPage implements OnInit {
  constructor(private modalController: ModalController, private menu:MenuController) {}
  isModalOpen = false;
  modalContent:any={};

  habitaciones = [
    {
      image: 'assets/precidencial/precidencial1.jpg',
      title: 'Habitación Precidencial',
      camas: 'King-size con ropa de cama de alta calidad',
      banos: 'Lujoso, con jacuzzi, ducha separada y doble lavabo',
      estar: 'Amplia, con sofás y área de entretenimiento'
    },
    {
      image: 'assets/precidencial/precidencial2.jpg',
      title: 'Habitación Precidencial',
      camas: 'King-size con ropa de cama de alta calidad',
      banos: 'Lujoso, con jacuzzi, ducha separada y doble lavabo',
      estar: 'Amplia, con sofás y área de entretenimiento'
    },
    {
      image: 'assets/precidencial/precidencial3.jpg',
      title: 'Habitación Precidencial',
      camas: 'King-size con ropa de cama de alta calidad',
      banos: 'Lujoso, con jacuzzi, ducha separada y doble lavabo',
      estar: 'Amplia, con sofás y área de entretenimiento'
    },
    {
      image: 'assets/precidencial/precidencial4.jpg',
      title: 'Habitación Precidencial ',
      camas: 'King-size con ropa de cama de alta calidad',
      banos: 'Lujoso, con jacuzzi, ducha separada y doble lavabo',
      estar: 'Amplia, con sofás y área de entretenimiento'
    }
  ];

  openModal(habitaciones: any) {
    this.modalContent = habitaciones;
    this.isModalOpen = true;
  }
  

  ngOnInit() {this.menu.enable(false);}

}

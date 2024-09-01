import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-hfamiliar',
  templateUrl: './hfamiliar.page.html',
  styleUrls: ['./hfamiliar.page.scss'],
})
export class HfamiliarPage implements OnInit {
  camas: string = "";
  banos: string = "";
  estar: string = "";
  isModalOpen = false;
  modalContent: any = {};

  habitaciones = [
    {
      image: 'assets/familiar/familiar.3.jpg',
      title: 'Habitación Familiar',
      camas: '2 camas matrimoniales además de una cuna para tu bb',
      banos: 'Baño más grande con bañera y ducha',
      estar: 'Espacio adicional con sofás o sillones',
      reservaRuta: '/reserva'
    },
    {
      image: 'assets/familiar/familiar.jpg',
      title: 'Habitación Familiar',
      camas: '1 cama matrimonial y 2 camas individuales',
      banos: 'Baño más grande con bañera y ducha',
      estar: 'Espacio adicional con sofás o sillones',
      reservaRuta: '/habitacionf2'
    },
    {
      image: 'assets/familiar/familiar.1.jpg',
      title: 'Habitación Familiar',
      camas: '1 cama matrimonial y 1 cama individual',
      banos: 'Baño más grande con bañera y ducha',
      estar: 'Espacio adicional con sofás o sillones',
      reservaRuta: '/habitacionf3'
    },
    {
      image: 'assets/familiar/familiar.4.jpg',
      title: 'Habitación Familiar',
      camas: '2 camas matrimoniales',
      banos: 'Baño más grande con bañera y ducha',
      estar: 'Espacio adicional con sofás o sillones',
      reservaRuta: '/habitacionf4'
    }
  ];

  constructor(private router: Router, private activedrouter: ActivatedRoute, private menu: MenuController) {}

  openModal(habitacion: any) {
    this.modalContent = habitacion;
    this.isModalOpen = true;
  }

  ngOnInit() {
    this.activedrouter.paramMap.subscribe(paramMap => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.camas = navigation.extras.state['cam'] || '';
        this.banos = navigation.extras.state['ban'] || '';
        this.estar = navigation.extras.state['est'] || '';
      }
    });
    this.menu.enable(false);
  }
}

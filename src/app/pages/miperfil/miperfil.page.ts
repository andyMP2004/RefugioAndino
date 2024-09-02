import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  nombre: string ="Daryen Fernandez";
  usuario: string = "";
  rut: string ="21.231.321-5"
  constructor(private router: Router, private activedrouter: ActivatedRoute, private menu: MenuController) { }

  ngOnInit() {
    this.activedrouter.paramMap.subscribe(paramMap => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.usuario = navigation.extras.state['usu'] || '';
      }
    });
    this.menu.enable(false);
  }
}

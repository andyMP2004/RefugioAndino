import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {

  usuario: string = "";
  contrasena: string = "";

  constructor(private router: Router, private activedrouter: ActivatedRoute) { }

  ngOnInit() {
    this.activedrouter.paramMap.subscribe(paramMap => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.usuario = navigation.extras.state['usu'] || '';
        this.contrasena = navigation.extras.state['con'] || '';
      }
    });
  }
}

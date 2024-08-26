import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  usuario: string = "";
  contrasena: string = "";

  constructor(private router: Router) {}

  irPagina() {
    let navigationExtras: NavigationExtras = {
      state: {
        usu: this.usuario,
        con: this.contrasena,
      }
    };
    this.router.navigate(['/miperfil'], navigationExtras);
  }

}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  camas: string ="";
  banos: string ="";
  estar: string ="";
  constructor(private menu: MenuController, private router: Router, private alertController: AlertController) { }
  async irPagina() {
      let navigationExtras: NavigationExtras = {
        state: {
          cam: this.camas,
          ban: this.banos,
          est: this.estar,
        }
      };
      this.router.navigate(['/hfamiliar'], navigationExtras);
  }

  ngOnInit() {this.menu.enable(false);
  }
}

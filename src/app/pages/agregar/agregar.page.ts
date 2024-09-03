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
  constructor(private menu: MenuController, private router: Router, private alertController: AlertController) { }
  async agregar() {
    if(!this.camas || !this.banos){
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacios',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      })
      await alert.present()
    }else if(this.camas.length<5 || this.camas.length>50){
      const alert = await this.alertController.create({
        header: 'La descripcion debe tener entre 6 y 50 caracteres',
        message: 'Por favor, intente nuevamente',
        buttons: ['Aceptar'],
      })
      await alert.present()
    }else if(this.banos.length<5 || this.banos.length>50){
      const alert = await this.alertController.create({
        header: 'La descripcion debe tener entre 6 y 50 caracteres',
        message: 'Por favor, intente nuevamente',
        buttons: ['Aceptar'],
      })
      await alert.present()
    }else{
        let navigationExtras: NavigationExtras = {
        state: {
          cam: this.camas,
          ban: this.banos,        }
      };
      this.router.navigate(['/hfamiliar'], navigationExtras);
    }

  }
  ngOnInit() {this.menu.enable(false);
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/service/servicios/auth.service';
@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  correo: string = '';
  constructor(private router: Router, private alertController: AlertController ,private menu:MenuController, private auth: AuthService) {}
 
  async irPagina() {
    if (!this.correo) {
      const alert = await this.alertController.create({
        header: 'Los datos no pueden estar vacíos',
        message: 'Por favor, complete todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } 
    else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(this.correo)) {
      const alert = await this.alertController.create({
        header: 'Correo inválido',
        message: 'Por favor, ingrese un correo electrónico válido.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }else {
      const alert = await this.alertController.create({
        header: 'Correo enviado',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
  async recuperarContrasena() {
    this.auth.resetAuth(this.correo).then(()=>{
      console.log('enviado');
    }).catch(()=>{
      console.log('error');

    }) 
     
  }



  ngOnInit() {this.menu.enable(false);
  }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdService } from 'src/app/service/servicios/bd.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  idusuario!: number;
  nombreusuario: string = "";
  correo: string = "";
  telefono: string = "";

  constructor(
    private router: Router,
    private activedrouter: ActivatedRoute,
    private bd: BdService,
    private alertController: AlertController
  ) {
    this.activedrouter.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        const state = this.router.getCurrentNavigation()?.extras?.state;
        this.idusuario = state?.['idusuario'];
        this.nombreusuario = state?.['nombreusuario'];
        this.correo = state?.['correo'];
        this.telefono = state?.['telefono'];
      }
    });

  }

  ngOnInit() {}

  async guardarCambios() {
    try {
      await this.bd.ModificarUsuario(this.idusuario, this.nombreusuario, this.correo, this.telefono);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Perfil actualizado correctamente',
        buttons: ['OK']
      });
      await alert.present();

      this.router.navigate(['/miperfil']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al actualizar el perfil. Por favor, inténtelo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}

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
  errorMessage:string="";
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
        this.telefono = state?.['telefono'];
      }
    });

  }

  ngOnInit() {
  }

  async guardarCambios() {
    if (!this.nombreusuario || !this.telefono) {
      this.errorMessage = "Debe rellenar todos los campos";
      const alert = await this.alertController.create({
        header: 'Los Campos están vacíos',
        message: 'Por favor, rellene todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }else if (this.nombreusuario.length < 6 || this.nombreusuario.length > 30) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El nombre no debe ser menor a 6 ni mayor a 30 caracteres',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    
    else if(!this.validarTelefono(this.telefono)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Solamente puede ingresar numeros',
        buttons: ['OK']
      });
      await alert.present();      return;
    }    
    else{
       this.bd.ModificarUsuario(this.idusuario, this.nombreusuario, this.telefono);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Perfil actualizado correctamente',
        buttons: ['OK']
      });
      await alert.present();

      this.router.navigate(['/miperfil']);
    }
  }

  validarTelefono(telefono: string): boolean {
    const soloNumeros = telefono.replace(/\D/g, '');
    this.telefono = soloNumeros.slice(0, 9);
    return soloNumeros.length == telefono.length; 
  }
  
}

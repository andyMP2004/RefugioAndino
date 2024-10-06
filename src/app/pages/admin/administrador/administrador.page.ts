import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {
  idusuario: string = "";
  nombreusuario: string = "";
  rutusuario: string = "";

  seleccion: string = "";
  cantidad: string = "";
  tipohabitacion: string = "";

  arreglousuario: any = [
    {
      idusuario: '',
      nombreusuario: '',
      rutusuario: ''
    }
  ];

  arreglohabitacion: any = [
    {
      cantidad: '',
      tipohabitacion: ''
    }
  ];

  constructor(private menu: MenuController, private bd: BdService, private router: Router ) {}

  ngOnInit() {
    this.menu.enable(false);
    this.bd.dbState().subscribe(res => {
      this.arreglousuario = res;
      if (res) {
        this.bd.fetchUsuario().subscribe(users => {
          this.arreglousuario = users;
        });
      }
    });

    this.bd.dbState().subscribe(res => {
      this.arreglohabitacion = res;
      if (res) {
        this.bd.fetchHabitacion().subscribe(users => {
          this.arreglohabitacion = users;
        });
      }
    });
  }

  
  eliminar(x: any) {
    this.bd.eliminarUsuario(x.idusuario);
  }




  navigate(index: number) {
    if (index == 0) {
      this.router.navigate(['/agregar']); 
    } else if (index == 1) {
      this.router.navigate(['/agregarp']);
    } else if (index == 2) {
      this.router.navigate(['/agregars']);
    }
  }


}

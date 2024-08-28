import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'habitaciones',
    loadChildren: () => import('./pages/habitaciones/habitaciones.module').then( m => m.HabitacionesPageModule)
  },
  {
    path: 'reserva',
    loadChildren: () => import('./pages/reserva/reserva.module').then( m => m.ReservaPageModule)
  },
  {
    path: 'hfamiliar',
    loadChildren: () => import('./pages/hfamiliar/hfamiliar.module').then( m => m.HfamiliarPageModule)
  },
  {
    path: 'hsuite',
    loadChildren: () => import('./pages/hsuite/hsuite.module').then( m => m.HsuitePageModule)
  },
  {
    path: 'hpresidencial',
    loadChildren: () => import('./pages/hpresidencial/hpresidencial.module').then( m => m.HpresidencialPageModule)
  },
  {
    path: 'miperfil',
    loadChildren: () => import('./pages/miperfil/miperfil.module').then( m => m.MiperfilPageModule)
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./pages/restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'reserva-suite',
    loadChildren: () => import('./pages/reserva-suite/reserva-suite.module').then( m => m.ReservaSuitePageModule)
  },
  {
    path: 'reserva-presidencial',
    loadChildren: () => import('./pages/reserva-presidencial/reserva-presidencial.module').then( m => m.ReservaPresidencialPageModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./pages/reservas/reservas.module').then( m => m.ReservasPageModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./pages/admin/administrador/administrador.module').then( m => m.AdministradorPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
   {
    path: 'ayuda',
    loadChildren: () => import('./pages/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },

  {
    path: 'habitacionf2',
    loadChildren: () => import('./pages/reserva/habitacionf2/habitacionf2.module').then( m => m.Habitacionf2PageModule)
  },
  {
    path: 'habitacionf3',
    loadChildren: () => import('./pages/reserva/habitacionf3/habitacionf3.module').then( m => m.Habitacionf3PageModule)
  },
  {
    path: 'habitacionf4',
    loadChildren: () => import('./pages/reserva/habitacionf4/habitacionf4.module').then( m => m.Habitacionf4PageModule)
  },
  {
    path: 'suite2',
    loadChildren: () => import('./pages/reserva-suite/suite2/suite2.module').then( m => m.Suite2PageModule)
  },
  {
    path: 'suite3',
    loadChildren: () => import('./pages/reserva-suite/suite3/suite3.module').then( m => m.Suite3PageModule)
  },
  {
    path: 'suite4',
    loadChildren: () => import('./pages/reserva-suite/suite4/suite4.module').then( m => m.Suite4PageModule)
  },
  {
    path: 'suite-p2',
    loadChildren: () => import('./pages/reserva-presidencial/suite-p2/suite-p2.module').then( m => m.SuiteP2PageModule)
  },
  {
    path: 'suite-p3',
    loadChildren: () => import('./pages/reserva-presidencial/suite-p3/suite-p3.module').then( m => m.SuiteP3PageModule)
  },
  {
    path: 'suite-p4',
    loadChildren: () => import('./pages/reserva-presidencial/suite-p4/suite-p4.module').then( m => m.SuiteP4PageModule)
  },

  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  }
 
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

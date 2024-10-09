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
    path: 'agregar',
    loadChildren: () => import('./pages/agregar/agregar.module').then( m => m.AgregarPageModule)
  },  
  {
    path: 'agregars',
    loadChildren: () => import('./pages/agregars/agregars.module').then( m => m.AgregarsPageModule)
  },
  {
    path: 'agregarp',
    loadChildren: () => import('./pages/agregarp/agregarp.module').then( m => m.AgregarpPageModule)
  },

  {
    path: 'modificar',
    loadChildren: () => import('./pages/modificar/modificar.module').then( m => m.ModificarPageModule)
  },

  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

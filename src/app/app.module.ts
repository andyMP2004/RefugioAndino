import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NavigationExtras, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    AngularFireModule, // Inicializa Firebase con tus credenciales
    AngularFireAuthModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,
    SQLite,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {    
  constructor(private router:Router) {
    this.initializeApp();
  }

  async initializeApp() {
    // Inicializa notificaciones locales
    const permissionResult = await LocalNotifications.requestPermissions();
    if (permissionResult.display !== 'granted') {
      console.warn('Permiso de notificaciones no otorgado');
      return; // No continuar si no hay permisos
    }

    // Escucha eventos de notificaciones
    LocalNotifications.addListener('localNotificationReceived', (notification) => {
      console.log('Notificación recibida:', notification);
      // Redirige a una página específica
      this.router.navigate(['/reservas']); // Cambia '/reservas' a la ruta que desees
    });
  }
}

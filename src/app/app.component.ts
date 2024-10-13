import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  async initializeApp() {
    await this.requestNotificationPermissions();
  }

  async requestNotificationPermissions() {
    const permissionResult = await LocalNotifications.requestPermissions();
    if (permissionResult.display !== 'granted') {
      console.warn('Permiso de notificaciones no otorgado');
    } else {
      console.log('Permiso de notificaciones otorgado');
    }
  }
}

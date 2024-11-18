import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.showSplash();
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
  async showSplash(){
    await SplashScreen.show({
      autoHide:true,
      showDuration:3000 
    })
  }
}

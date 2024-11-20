import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarContrasenaPage } from './cambiar-contrasena.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
describe('CambiarContrasenaPage', () => {
  let component: CambiarContrasenaPage;
  let fixture: ComponentFixture<CambiarContrasenaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiarContrasenaPage],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule, HttpClientModule],
      providers: [NativeStorage, SQLite,]
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

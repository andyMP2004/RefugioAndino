import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, AlertController } from '@ionic/angular';
import { fakeAsync, tick } from '@angular/core/testing';
import { BdService } from 'src/app/service/servicios/bd.service';
import { AuthService } from 'src/app/service/servicios/auth.service';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let alertController: AlertController;
  let spy: jasmine.Spy;
  let bdServiceSpy: jasmine.SpyObj<BdService>;

  beforeEach(async () => {
    // Crear un espía para BdService
    bdServiceSpy = jasmine.createSpyObj('BdService', ['insertarUsuario']);
    
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        HttpClientModule
      ],
      providers: [
        NativeStorage,
        SQLite,
        { provide: BdService, useValue: bdServiceSpy },
        AlertController,
        AuthService // Asegúrate de que AuthService también esté disponible si lo usas en tu componente
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    alertController = TestBed.inject(AlertController);
    fixture.detectChanges();
    
    spy = spyOn(component, 'presentAlert').and.callThrough(); // Espiar presentAlert
  });

  afterEach(() => {
    spy.calls.reset();  // Restablece las llamadas del espía entre las pruebas
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('verificar contraseña incorrecta muestra la alerta', async () => {
    const resultadoInvalido = await component.validarContrasena('hola');
  
    expect(resultadoInvalido).toBeFalsy();
  
    expect(spy).toHaveBeenCalledWith(
      'Contraseña invalida',
      'La contraseña debe tener entre 6 y 12 caracteres.'
    );
  });
  
});

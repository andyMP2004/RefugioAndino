import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { IonicModule, AlertController, MenuController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { BdService } from '../service/servicios/bd.service';
import { AuthService } from 'src/app/service/servicios/auth.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs'; // Para simular respuestas de observables

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let bdServiceSpy: jasmine.SpyObj<BdService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let nativeStorageSpy: jasmine.SpyObj<NativeStorage>;

  beforeEach(async () => {
    // Crear espías para los servicios
    bdServiceSpy = jasmine.createSpyObj('BdService', ['BuscarUsuC', 'modificarContra']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['inicioSesion']);
    nativeStorageSpy = jasmine.createSpyObj('NativeStorage', ['setItem']);

    // Configurar el TestBed
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule // Simula las rutas
      ],
      providers: [
        { provide: BdService, useValue: bdServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NativeStorage, useValue: nativeStorageSpy },
        AlertController, 
        MenuController 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

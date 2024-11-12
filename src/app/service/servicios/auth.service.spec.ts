import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Importa AngularFireAuthModule
import { AngularFireModule } from '@angular/fire/compat'; // Importa AngularFireModule
import { environment } from 'src/environments/environment'; // Asegúrate de tener la configuración de Firebase en environment

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase con tu configuración
        AngularFireAuthModule // Asegúrate de importar AngularFireAuthModule
      ],
      providers: [AuthService], // Provee el servicio que estás probando
    });
    service = TestBed.inject(AuthService); // Inyecta el servicio AuthService
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio haya sido creado correctamente
  });
});

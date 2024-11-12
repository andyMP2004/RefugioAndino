import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministradorPage } from './administrador.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { BdService } from 'src/app/service/servicios/bd.service';
import { of } from 'rxjs';

// Step 1: Define a mock class for SQLite
class SQLiteMock {
  create() {
    return Promise.resolve({
      executeSql: (query: string, params: any[]) => Promise.resolve({
        rows: {
          length: 0,
          item: (index: number) => null, // Simula una fila vacía
        }
      })
    });
  }
}

// Step 2: Define a mock class for BdService
class BdServiceMock {
  fetchUsuariosPorEstado(estado: string) {
    return of([]); // Devuelve un Observable vacío para usuarios
  }

  fetchHabitacionesPorEstado(estado: string) {
    return of([]); // Devuelve un Observable vacío para habitaciones
  }
  fetchReserva(id: string) {
    return of([]); // Devuelve un Observable vacío para reservas
  }
  fetchReservaPorEstado(id: string) {
    return of([]); // Devuelve un Observable vacío para reservas
  }
  dbState() {
    return of(true); // Simula que la base de datos está en un estado "activo" o "conectado"
  }
}

describe('AdministradorPage', () => {
  let component: AdministradorPage;
  let fixture: ComponentFixture<AdministradorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministradorPage],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        HttpClientModule
      ],
      providers: [
        NativeStorage,
        { provide: SQLite, useClass: SQLiteMock }, // Usa el mock de SQLite
        { provide: BdService, useClass: BdServiceMock } // Usa el mock de BdService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

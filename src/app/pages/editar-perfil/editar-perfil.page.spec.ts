import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPerfilPage } from './editar-perfil.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing'; // Agregar RouterTestingModule aquí

describe('EditarPerfilPage', () => {
  let component: EditarPerfilPage;
  let fixture: ComponentFixture<EditarPerfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarPerfilPage],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        HttpClientModule,
        RouterTestingModule // Esto importa RouterTestingModule, que proporciona ActivatedRoute para pruebas
      ],
      providers: [
        NativeStorage,
        SQLite
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
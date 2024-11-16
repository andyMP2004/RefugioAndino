import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaPage } from './reserva.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing'; 

describe('ReservaPage', () => {
  let component: ReservaPage;
  let fixture: ComponentFixture<ReservaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservaPage],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        HttpClientModule,
        RouterTestingModule 
      ],
      providers: [
        NativeStorage,
        SQLite
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calcular total para las noches', async () => {
    component.noches = 3;  
    component.monedaSeleccionada = 'CLP'; 

    spyOn(component.divisaService, 'convertCurrency').and.returnValue(Promise.resolve(60000));
  
    await component.calculartotal(); 
  
    expect(component.totalConvertido).toEqual(60000);
  
    expect(component.divisaService.convertCurrency).toHaveBeenCalledWith(60000, 'CLP');
  });
  
  
});

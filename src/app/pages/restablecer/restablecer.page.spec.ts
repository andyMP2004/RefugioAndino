import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestablecerPage } from './restablecer.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { BdService } from 'src/app/service/servicios/bd.service';
class SQLiteMock {
  create() {
    return Promise.resolve({
      executeSql: (query: string, params: any[]) => Promise.resolve({
        rows: {
          length: 0,
          item: (index: number) => null, 
        }
      })
    });
  }
}
class BdServiceMock {
  BuscarUsuC(correo: string) {
    return of([]); 
  }
  dbState() {
    return of(true); 
  }
}
describe('RestablecerPage', () => {
  let component: RestablecerPage;
  let fixture: ComponentFixture<RestablecerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestablecerPage],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule, HttpClientModule],
      providers: [NativeStorage, SQLite,{ provide: SQLite, useClass: SQLiteMock },
        { provide: BdService, useClass: BdServiceMock }] 
      
    }).compileComponents();

    fixture = TestBed.createComponent(RestablecerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar una alerta si el correo no contiene @gmail.com', async () => {
    component.correo = 'usuario'; 
  
    const alertaSpy = spyOn(component, 'alerta').and.callThrough(); 
  
    await component.irPagina();
  
    expect(alertaSpy).toHaveBeenCalledWith("El correo debe contener @gmail.com");
  });
  
});

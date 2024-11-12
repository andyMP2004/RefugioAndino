import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaPresidencialPage } from './reserva-presidencial.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { BdService } from 'src/app/service/servicios/bd.service';
import { DivisaService } from 'src/app/service/servicios/divisa.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController, AlertController } from '@ionic/angular';
import { of } from 'rxjs'; // Para simular respuestas de servicios

describe('ReservaPresidencialPage', () => {
  let component: ReservaPresidencialPage;
  let fixture: ComponentFixture<ReservaPresidencialPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        BdService,
        DivisaService,
        NativeStorage,
        MenuController,
        AlertController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaPresidencialPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta cambios para actualizar la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });
});

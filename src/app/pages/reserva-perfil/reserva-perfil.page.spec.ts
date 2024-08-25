import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaPerfilPage } from './reserva-perfil.page';

describe('ReservaPerfilPage', () => {
  let component: ReservaPerfilPage;
  let fixture: ComponentFixture<ReservaPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

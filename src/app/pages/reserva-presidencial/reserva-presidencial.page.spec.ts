import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaPresidencialPage } from './reserva-presidencial.page';

describe('ReservaPresidencialPage', () => {
  let component: ReservaPresidencialPage;
  let fixture: ComponentFixture<ReservaPresidencialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaPresidencialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

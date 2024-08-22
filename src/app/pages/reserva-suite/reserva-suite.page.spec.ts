import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaSuitePage } from './reserva-suite.page';

describe('ReservaSuitePage', () => {
  let component: ReservaSuitePage;
  let fixture: ComponentFixture<ReservaSuitePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaSuitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

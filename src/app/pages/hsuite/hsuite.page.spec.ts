import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HsuitePage } from './hsuite.page';

describe('HsuitePage', () => {
  let component: HsuitePage;
  let fixture: ComponentFixture<HsuitePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HsuitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

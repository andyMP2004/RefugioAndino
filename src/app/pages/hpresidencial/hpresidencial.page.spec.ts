import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HpresidencialPage } from './hpresidencial.page';

describe('HpresidencialPage', () => {
  let component: HpresidencialPage;
  let fixture: ComponentFixture<HpresidencialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HpresidencialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

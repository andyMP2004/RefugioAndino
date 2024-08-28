import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuiteP4Page } from './suite-p4.page';

describe('SuiteP4Page', () => {
  let component: SuiteP4Page;
  let fixture: ComponentFixture<SuiteP4Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiteP4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

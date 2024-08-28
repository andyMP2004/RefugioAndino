import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuiteP3Page } from './suite-p3.page';

describe('SuiteP3Page', () => {
  let component: SuiteP3Page;
  let fixture: ComponentFixture<SuiteP3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiteP3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

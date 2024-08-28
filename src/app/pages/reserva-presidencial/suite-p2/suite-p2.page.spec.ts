import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuiteP2Page } from './suite-p2.page';

describe('SuiteP2Page', () => {
  let component: SuiteP2Page;
  let fixture: ComponentFixture<SuiteP2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiteP2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Suite3Page } from './suite3.page';

describe('Suite3Page', () => {
  let component: Suite3Page;
  let fixture: ComponentFixture<Suite3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Suite3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

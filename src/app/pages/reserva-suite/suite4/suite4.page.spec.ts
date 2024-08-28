import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Suite4Page } from './suite4.page';

describe('Suite4Page', () => {
  let component: Suite4Page;
  let fixture: ComponentFixture<Suite4Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Suite4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

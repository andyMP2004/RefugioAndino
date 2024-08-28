import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Suite2Page } from './suite2.page';

describe('Suite2Page', () => {
  let component: Suite2Page;
  let fixture: ComponentFixture<Suite2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Suite2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

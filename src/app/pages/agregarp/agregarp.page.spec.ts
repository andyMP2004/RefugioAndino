import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarpPage } from './agregarp.page';

describe('AgregarpPage', () => {
  let component: AgregarpPage;
  let fixture: ComponentFixture<AgregarpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

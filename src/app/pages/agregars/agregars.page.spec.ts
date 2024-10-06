import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarsPage } from './agregars.page';

describe('AgregarsPage', () => {
  let component: AgregarsPage;
  let fixture: ComponentFixture<AgregarsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

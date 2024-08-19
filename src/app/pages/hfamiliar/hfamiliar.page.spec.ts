import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HfamiliarPage } from './hfamiliar.page';

describe('HfamiliarPage', () => {
  let component: HfamiliarPage;
  let fixture: ComponentFixture<HfamiliarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HfamiliarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

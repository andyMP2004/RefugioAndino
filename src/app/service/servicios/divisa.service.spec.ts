import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';  // Importar HttpClientModule
import { DivisaService } from './divisa.service';

describe('DivisaService', () => {
  let service: DivisaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],  // Asegúrate de incluir HttpClientModule aquí
    });
    service = TestBed.inject(DivisaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

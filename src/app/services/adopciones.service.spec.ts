import { TestBed } from '@angular/core/testing';

import { AdopcionesService } from './adopciones.service';

describe('AdopcionesService', () => {
  let service: AdopcionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdopcionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

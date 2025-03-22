import { TestBed } from '@angular/core/testing';

import { TramitesService } from './tramites.service';

describe('TramitesService', () => {
  let service: TramitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

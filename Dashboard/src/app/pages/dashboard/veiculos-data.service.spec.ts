import { TestBed } from '@angular/core/testing';

import { VeiculosDataService } from './veiculos-data.service';

describe('VeiculosDataService', () => {
  let service: VeiculosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeiculosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

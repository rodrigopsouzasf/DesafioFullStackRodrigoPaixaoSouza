import { TestBed } from '@angular/core/testing';

import { UsuarioExistService } from './usuario-exist.service';

describe('UsuarioExistService', () => {
  let service: UsuarioExistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioExistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

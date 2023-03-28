import { TestBed } from '@angular/core/testing';

import { MinhasPublicacoesService } from './minhas-publicacoes.service';

describe('MinhasPublicacoesService', () => {
  let service: MinhasPublicacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinhasPublicacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserPerfilDataService } from './user-perfil-data.service';

describe('UserPerfilDataService', () => {
  let service: UserPerfilDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPerfilDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

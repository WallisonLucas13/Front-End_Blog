import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
  let router: Router;
  
  it('should create an instance', () => {
    expect(new AuthGuard(router)).toBeTruthy();
  });
});

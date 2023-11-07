import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it(' service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be register'), () => {
    expect(service.register).toBe("Register succesfull")
  }
});

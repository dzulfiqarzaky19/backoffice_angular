import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    localStorage.clear();
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: spy }],
    });
    service = TestBed.inject(AuthService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return true, set currentUser, and navigate to dashboard on successful login', () => {
      const result = service.login('admin', 'admin');

      expect(result).toBeTrue();
      expect(service.currentUser()).toBe('admin');
      expect(localStorage.getItem('user_session')).toBe('admin');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should return false and not change state when credentials are not admin/admin', () => {
      const result = service.login('wrong', 'creds');

      expect(result).toBeFalse();
      expect(service.currentUser()).toBeNull();
      expect(localStorage.getItem('user_session')).toBeNull();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should clear currentUser, remove session, and navigate to login', () => {
      service.login('admin', 'admin');
      expect(service.isLoggedIn()).toBeTrue();

      service.logout();

      expect(service.currentUser()).toBeNull();
      expect(localStorage.getItem('user_session')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if currentUser is set', () => {
      service.login('admin', 'admin');
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false if currentUser is null', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });
  });
});

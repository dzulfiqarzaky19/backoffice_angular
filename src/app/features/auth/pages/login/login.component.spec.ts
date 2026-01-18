import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginComponent } from './login.component';

@Component({
  standalone: true,
  template: '',
  selector: 'app-dashboard'
})
class DashboardComponent { }

describe('LoginComponent Integration', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, DashboardComponent],
      providers: [
        AuthService,
        provideRouter([
          { path: 'login', component: LoginComponent },
          { path: 'dashboard', component: DashboardComponent }
        ])
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    localStorage.clear();
    authService.logout();

    fixture.detectChanges();
    await router.navigate(['/login']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should be invalid when empty', () => {
      expect(component.loginForm.valid).toBeFalse();
    });

    it('should be invalid when password is less than 3 characters', () => {
      component.loginForm.controls['username'].setValue('user');
      component.loginForm.controls['password'].setValue('12');
      expect(component.loginForm.valid).toBeFalse();
    });

    it('should be valid when inputs are filled (format correct)', () => {
      component.loginForm.controls['username'].setValue('anyuser');
      component.loginForm.controls['password'].setValue('anypass');
      expect(component.loginForm.valid).toBeTrue();
    });
  });

  describe('onSubmit (Integration)', () => {
    it('should navigate to dashboard on successful login', async () => {
      component.loginForm.controls['username'].setValue('admin');
      component.loginForm.controls['password'].setValue('admin');

      component.onSubmit();

      await fixture.whenStable();

      expect(authService.currentUser()).toBe('admin');
      expect(location.path()).toBe('/dashboard');
      expect(component.errorMessage()).toBeNull();
    });

    it('should fail login and stay on page with invalid credentials', async () => {
      component.loginForm.controls['username'].setValue('wrong');
      component.loginForm.controls['password'].setValue('wrong');

      component.onSubmit();

      await fixture.whenStable();

      expect(authService.currentUser()).toBeNull();
      expect(location.path()).toBe('/login');
      expect(component.errorMessage()).toContain('Invalid username or password');
    });
  });
});

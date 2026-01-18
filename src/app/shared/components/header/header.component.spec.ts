import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../../core/services/auth.service';
import { signal } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      currentUser: signal('testuser')
    });

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display application title', () => {
    const titleElement = fixture.debugElement.query(By.css('.header-left app-typography'));
    expect(titleElement.nativeElement.textContent).toContain('Management System');
  });

  it('should display current user name', () => {
    const userElement = fixture.debugElement.query(By.css('.user-info app-typography'));
    expect(userElement.nativeElement.textContent).toContain('testuser');
  });

  it('should display user avatar with first letter', () => {
    const avatarElement = fixture.debugElement.query(By.css('.user-avatar'));
    expect(avatarElement.nativeElement.textContent).toContain('t');
  });

  it('should call logout when logout button is clicked', () => {
    const logoutBtn = fixture.debugElement.query(By.css('.btn-logout'));
    logoutBtn.nativeElement.click();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});

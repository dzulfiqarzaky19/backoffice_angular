import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgControl } from '@angular/forms';
import { PasswordComponent } from './password.component';
import { LucideAngularModule } from 'lucide-angular';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let ngControlSpy: any;

  beforeEach(async () => {
    ngControlSpy = {
      valueAccessor: null,
      invalid: false,
      dirty: false,
      touched: false,
      errors: null,
    };

    await TestBed.configureTestingModule({
      imports: [PasswordComponent, LucideAngularModule],
      providers: [{ provide: NgControl, useValue: ngControlSpy }],
    })
      .overrideComponent(PasswordComponent, {
        add: { providers: [{ provide: NgControl, useValue: ngControlSpy }] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    if (ngControlSpy) {
      ngControlSpy.valueAccessor = component;
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label and placeholder', () => {
    fixture.componentRef.setInput('label', 'Pass Label');
    fixture.componentRef.setInput('placeholder', 'Enter pass');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label'));
    const input = fixture.debugElement.query(By.css('input'));

    expect(label.nativeElement.textContent).toContain('Pass Label');
    expect(input.attributes['placeholder']).toBe('Enter pass');
  });

  it('should toggle password visibility', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const toggleBtn = fixture.debugElement.query(By.css('.eye-toggle'));

    expect(input.attributes['type']).toBe('password');
    expect(component.showPassword()).toBeFalse();

    toggleBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.showPassword()).toBeTrue();
    expect(input.attributes['type']).toBe('text');

    toggleBtn.nativeElement.click();
    fixture.detectChanges();
    expect(input.attributes['type']).toBe('password');
  });

  it('should show forgot password link when enabled', () => {
    fixture.componentRef.setInput('showForgotPassword', true);
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('.forgot-link'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('Forgot password?');
  });

  it('should NOT show forgot password link whenever disabled (default)', () => {
    const link = fixture.debugElement.query(By.css('.forgot-link'));
    expect(link).toBeFalsy();
  });

  it('should show error message when control is invalid', () => {
    ngControlSpy.invalid = true;
    ngControlSpy.touched = true;
    ngControlSpy.errors = { required: true };
    fixture.componentRef.setInput('label', 'Password');
    fixture.detectChanges();

    const errorMsg = fixture.debugElement.query(By.css('.error-msg'));
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.nativeElement.textContent).toContain('Password is required');
  });
});

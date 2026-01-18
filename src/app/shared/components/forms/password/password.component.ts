import { Component, input, signal, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import { TypographyComponent } from '../../../../shared/components/typography/typography.component';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule, TypographyComponent],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})

export class PasswordComponent implements ControlValueAccessor {
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  label = input('');
  placeholder = input('');
  showForgotPassword = input(false);
  id = `password-input-${Math.random().toString(36).substr(2, 9)}`;

  showPassword = signal(false);
  value = '';
  disabled = false;

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  get hasError(): boolean | null {
    return this.ngControl?.invalid && (this.ngControl?.dirty || this.ngControl?.touched);
  }

  getErrorMessage(): string {
    if (this.ngControl?.errors?.['required']) {
      return `${this.label() || 'Field'} is required`;
    }
    if (this.ngControl?.errors?.['minlength']) {
      const requiredLength = this.ngControl.errors['minlength'].requiredLength;
      return `${this.label() || 'Field'} must be at least ${requiredLength} characters`;
    }
    return 'Invalid field';
  }
}

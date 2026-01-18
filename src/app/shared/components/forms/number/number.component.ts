import { Component, input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { TypographyComponent } from '../../typography/typography.component';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [ReactiveFormsModule, TypographyComponent],
  templateUrl: './number.component.html',
  styleUrl: './number.component.css',
})
export class NumberComponent implements ControlValueAccessor {
  label = input('');
  placeholder = input('');
  id = `number-input-${Math.random().toString(36).substr(2, 9)}`;

  value: number | null = null;
  disabled = false;

  onChange: (value: number | null) => void = () => { };
  onTouched: () => void = () => { };

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
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
    const numValue = value === '' ? null : Number(value);
    this.value = numValue;
    this.onChange(numValue);
  }

  get hasError(): boolean | null {
    return this.ngControl?.invalid && (this.ngControl?.dirty || this.ngControl?.touched);
  }

  getErrorMessage(): string {
    if (this.ngControl?.errors?.['required']) {
      return `${this.label() || 'Field'} is required`;
    }
    if (this.ngControl?.errors?.['min']) {
      return `Minimum value is ${this.ngControl.errors['min'].min}`;
    }
    if (this.ngControl?.errors?.['max']) {
      return `Maximum value is ${this.ngControl.errors['max'].max}`;
    }
    return 'Invalid value';
  }
}

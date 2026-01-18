import { Component, input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { TypographyComponent } from '../../typography/typography.component';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [ReactiveFormsModule, TypographyComponent],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css',
})
export class DateComponent implements ControlValueAccessor {
  label = input('');
  id = `date-input-${Math.random().toString(36).substr(2, 9)}`;

  value = '';
  disabled = false;

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
      return `${this.label() || 'Date'} is required`;
    }

    return 'Invalid date';
  }
}

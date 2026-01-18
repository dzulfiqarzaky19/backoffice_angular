import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NumberComponent } from './number.component';

@Component({
  template: `<app-number-input
    [formControl]="control"
    label="Salary"
    placeholder="0"
  ></app-number-input>`,
  standalone: true,
  imports: [NumberComponent, ReactiveFormsModule],
})
class TestHostComponent {
  control = new FormControl<number | null>(null);
}

describe('NumberComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should propagate numeric value changes to form control', () => {
    const inputEl = fixture.debugElement.query(By.css('input[type="number"]'));
    inputEl.nativeElement.value = '5000000';
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    expect(component.control.value).toBe(5000000);
  });

  it('should handle empty value as null', () => {
    const inputEl = fixture.debugElement.query(By.css('input[type="number"]'));
    inputEl.nativeElement.value = '';
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    expect(component.control.value).toBeNull();
  });

  it('should show error message for min validation', () => {
    component.control.setValidators([Validators.min(100)]);
    component.control.setValue(50);
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('.error-msg'));
    expect(errorEl.nativeElement.textContent).toContain('Minimum value is 100');
  });
});

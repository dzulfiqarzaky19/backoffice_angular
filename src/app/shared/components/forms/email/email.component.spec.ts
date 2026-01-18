import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EmailComponent } from './email.component';

@Component({
    template: `<app-email-input [formControl]="control" label="Email Address" placeholder="Enter email"></app-email-input>`,
    standalone: true,
    imports: [EmailComponent, ReactiveFormsModule]
})
class TestHostComponent {
    control = new FormControl('');
}

describe('EmailComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent, EmailComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render label and placeholder', () => {
        const labelEl = fixture.debugElement.query(By.css('app-typography[variant="label"]'));
        const inputEl = fixture.debugElement.query(By.css('input'));

        expect(labelEl.nativeElement.textContent).toContain('Email Address');
        expect(inputEl.nativeElement.placeholder).toBe('Enter email');
    });

    it('should propagate value changes to form control', () => {
        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.value = 'test@example.com';
        inputEl.nativeElement.dispatchEvent(new Event('input'));

        expect(component.control.value).toBe('test@example.com');
    });

    it('should update input value when form control changes', () => {
        component.control.setValue('new@example.com');
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        expect(inputEl.nativeElement.value).toBe('new@example.com');
    });

    it('should show error message when invalid and touched', () => {
        component.control.setValidators([Validators.email]);
        component.control.setValue('invalid-email');
        component.control.markAsTouched();
        fixture.detectChanges();

        const errorEl = fixture.debugElement.query(By.css('.error-msg'));
        expect(errorEl).toBeTruthy();
        expect(errorEl.nativeElement.textContent).toContain('Invalid email format');
    });
});

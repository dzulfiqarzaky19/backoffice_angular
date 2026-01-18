import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DateComponent } from './date.component';

@Component({
    template: `<app-date-input [formControl]="control" label="Birth Date"></app-date-input>`,
    standalone: true,
    imports: [DateComponent, ReactiveFormsModule]
})
class TestHostComponent {
    control = new FormControl('');
}

describe('DateComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent, DateComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render label', () => {
        const labelEl = fixture.debugElement.query(By.css('app-typography[variant="label"]'));
        expect(labelEl.nativeElement.textContent).toContain('Birth Date');
    });

    it('should propagate value changes to form control', () => {
        const inputEl = fixture.debugElement.query(By.css('input[type="date"]'));
        inputEl.nativeElement.value = '2023-01-01';
        inputEl.nativeElement.dispatchEvent(new Event('input'));

        expect(component.control.value).toBe('2023-01-01');
    });

    it('should update input value when form control changes', () => {
        component.control.setValue('2023-12-31');
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        expect(inputEl.nativeElement.value).toBe('2023-12-31');
    });
});

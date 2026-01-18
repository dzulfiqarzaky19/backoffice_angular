import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SearchComponent } from './search.component';

@Component({
    template: `<app-search-input [formControl]="control" label="Group" [options]="options" placeholder="Search Group"></app-search-input>`,
    standalone: true,
    imports: [SearchComponent, ReactiveFormsModule]
})
class TestHostComponent {
    control = new FormControl('');
    options = ['Engineering', 'Finance', 'HR'];
}

describe('SearchComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent, SearchComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render label and datalist options', () => {
        const labelEl = fixture.debugElement.query(By.css('app-typography[variant="label"]'));
        expect(labelEl.nativeElement.textContent).toContain('Group');

        const datalist = fixture.debugElement.query(By.css('datalist'));
        expect(datalist).toBeTruthy();
        expect(datalist.children.length).toBe(3);
    });

    it('should propagate input changes to form control', () => {
        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.value = 'Eng';
        inputEl.nativeElement.dispatchEvent(new Event('input'));

        expect(component.control.value).toBe('Eng');
    });

    it('should show error if validation fails', () => {
        component.control.setValidators(Validators.required);
        component.control.setValue('');
        component.control.markAsTouched();
        fixture.detectChanges();

        const errorEl = fixture.debugElement.query(By.css('.error-msg'));
        expect(errorEl.nativeElement.textContent).toContain('Field is required');
    });
});

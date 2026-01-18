import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SelectComponent } from './select.component';

@Component({
    template: `<app-select-input [formControl]="control" label="Status" [options]="options" placeholder="Select Status"></app-select-input>`,
    standalone: true,
    imports: [SelectComponent, ReactiveFormsModule]
})
class TestHostComponent {
    control = new FormControl('');
    options = ['Active', 'Inactive', 'Suspended'];
}

describe('SelectComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent, SelectComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render label and options', () => {
        const labelEl = fixture.debugElement.query(By.css('app-typography[variant="label"]'));
        expect(labelEl.nativeElement.textContent).toContain('Status');

        const options = fixture.debugElement.queryAll(By.css('option'));

        expect(options.length).toBe(4);
        expect(options[1].nativeElement.textContent).toContain('Active');
    });

    it('should propagate selection to form control', () => {
        const selectEl = fixture.debugElement.query(By.css('select'));
        selectEl.nativeElement.value = 'Active';
        selectEl.nativeElement.dispatchEvent(new Event('change'));

        expect(component.control.value).toBe('Active');
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FormComponent } from './form.component';
import { EmployeeService } from '../../../../core/services/employee.service';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent { }

describe('FormComponent Integration', () => {
  let harness: RouterTestingHarness;
  let component: FormComponent;
  let fixture: ComponentFixture<unknown>;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent],
      providers: [
        EmployeeService,
        provideRouter([
          { path: 'dashboard/employee/add', component: FormComponent },
          { path: 'dashboard/employee/edit/:username', component: FormComponent },
          { path: 'dashboard/employee', component: DummyComponent }
        ]),
        DatePipe,
        CurrencyPipe
      ]
    }).compileComponents();

    employeeService = TestBed.inject(EmployeeService);
    harness = await RouterTestingHarness.create();
  });

  it('should create in add mode', async () => {
    component = await harness.navigateByUrl('dashboard/employee/add', FormComponent);
    fixture = harness.fixture;
    expect(component).toBeTruthy();

    const title = fixture.debugElement.query(By.css('.form-header app-typography.typography-h3'));
    expect(title.nativeElement.textContent).toContain('Add New Employee');
  });

  it('should create in edit mode and populate data', async () => {
    component = await harness.navigateByUrl('dashboard/employee/edit/user1', FormComponent);
    fixture = harness.fixture;
    expect(component).toBeTruthy();

    await fixture.whenStable();

    const title = fixture.debugElement.query(By.css('.form-header app-typography.typography-h3'));
    expect(title.nativeElement.textContent).toContain('Edit Employee');

    expect(component.employeeForm.get('username')?.value).toBe('user1');
    expect(component.employeeForm.get('username')?.disabled).toBeTrue();
  });
});

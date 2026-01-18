import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee.service';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Employee, EmployeeGroup, EmployeeStatus } from '../../../../shared/models/employee.model';
import { DatePipe } from '@angular/common';

export function isInListValidator(allowedValues: readonly string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return allowedValues.includes(control.value)
      ? null
      : { notInList: { value: control.value } };
  };
}

export function isValidDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const date = new Date(control.value);
    return !isNaN(date.getTime()) ? null : { invalidDate: true };
  };
}

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  providers: [DatePipe]
})
export class FormComponent {
  formBuilder = inject(FormBuilder);
  employeeService = inject(EmployeeService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  datePipe = inject(DatePipe);

  readonly username = computed(() => this.activatedRoute.snapshot.paramMap.get('username'));
  readonly employee = computed(() => this.employeeService.getEmployeeByUsername(this.username() || ''));
  readonly groupList = this.employeeService.groupList;
  readonly statusList = this.employeeService.statusList;

  constructor() {
    effect(() => {
      const employee = this.employee();

      if (!employee) {
        this.employeeForm.get('username')?.enable();
        return;
      }

      this.employeeForm.patchValue({
        ...employee,
        birthDate: this.datePipe.transform(employee.birthDate, 'yyyy-MM-dd'),
        description: this.datePipe.transform(employee.description, 'yyyy-MM-dd')
      });
      this.employeeForm.get('username')?.disable();
    });
  }

  employeeForm = this.formBuilder.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', [Validators.required, isValidDateValidator()]],
    basicSalary: [0, [Validators.required, Validators.min(2000000)]],
    status: ['', [Validators.required, isInListValidator(this.statusList())]],
    group: ['', [Validators.required, isInListValidator(this.groupList())]],
    description: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const rawValue = this.employeeForm.getRawValue();

    const employeeData: Employee = {
      username: rawValue.username || '',
      firstName: rawValue.firstName || '',
      lastName: rawValue.lastName || '',
      email: rawValue.email || '',
      birthDate: new Date(rawValue.birthDate || ''),
      basicSalary: Number(rawValue.basicSalary || 0),
      status: rawValue.status as EmployeeStatus,
      group: rawValue.group as EmployeeGroup,
      description: new Date(rawValue.description || ''),
    };

    if (this.username()) {
      this.employeeService.updateEmployee(this.username()!, employeeData);
    } else {
      this.employeeService.addEmployee(employeeData);
    }

    this.router.navigate(['/dashboard/employee']);
  }
}

import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee.service';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  router = inject(ActivatedRoute);
  employeeService = inject(EmployeeService);
  readonly username = computed(() => this.router.snapshot.paramMap.get('username'));
  readonly employee = computed(() => this.employeeService.getEmployeeByUsername(this.username() || ''));
}

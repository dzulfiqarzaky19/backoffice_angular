import { Component, computed, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Employee } from '../../../../shared/models/employee.model';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  router = inject(ActivatedRoute);
  employeeService = inject(EmployeeService);
  readonly username = computed(() => this.router.snapshot.paramMap.get('username'));
  readonly employee = computed(() =>
    this.employeeService.getEmployeeByUsername(this.username() || ''),
  );
}

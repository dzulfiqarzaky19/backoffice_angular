import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  router = inject(Router);
  employeeService = inject(EmployeeService);
  employees = this.employeeService.allEmployees;

  handleDelete(username: string) {
    console.log(username)
    this.employeeService.deleteEmployee(username)
  }

  handleEdit(username: string) {
    this.router.navigate(['dashboard/employee/edit', username])
  }

  handleDetail(username: string) {
    this.router.navigate(['dashboard/employee/detail', username])
  }

  handleAdd() {
    this.router.navigate(['dashboard/employee/add'])
  }
}

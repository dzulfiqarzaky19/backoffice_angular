import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  employeeService = inject(EmployeeService);
  employees = this.employeeService.allEmployees;

  handleDelete(username: string) {
    console.log(username)
    this.employeeService.deleteEmployee(username)
  }

  handleEdit(username: string) {
    const employee = this.employeeService.getEmployeeByUsername(username)
    console.log(employee)
  }

  handleDetail(username: string) {
    const employee = this.employeeService.getEmployeeByUsername(username)
    console.log(employee)
  }
}

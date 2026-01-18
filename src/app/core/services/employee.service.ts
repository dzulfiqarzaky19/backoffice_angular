import { computed, Injectable, signal } from '@angular/core';
import { Employee, EmployeeGroup, EmployeeState, EmployeeStatus } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees = signal<Employee[]>([])
  readonly allEmployees = this.employees.asReadonly();

  private readonly groups = signal<EmployeeGroup[]>([
    'Engineering', 'HR', 'Finance', 'Marketing', 'Sales',
    'Product', 'Design', 'Legal', 'Operations', 'Leadership'
  ]);

  readonly groupsList = this.groups.asReadonly();

  constructor() {
    this.generateMockData();
  }

  private generateMockData() {
    const statuses: EmployeeStatus[] = ['Active', 'Resigned', 'On Leave', 'Terminated'];
    const mock: Employee[] = []

    for (let i = 1; i <= 105; i++) {
      const randomDate = new Date();
      randomDate.setFullYear(1980 + Math.floor(Math.random() * 20));

      const randomDescDate = new Date();

      mock.push({
        username: `user${i}`,
        firstName: `First${i}`,
        lastName: `Last${i}`,
        email: `user${i}@example.com`,
        birthDate: randomDate,
        basicSalary: 5000000 + (Math.floor(Math.random() * 50) * 1000000) + (Math.floor(Math.random() * 100) * 1000),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        group: this.groups()[Math.floor(Math.random() * this.groups().length)],
        description: randomDescDate
      });
    }

    this.employees.set(mock);
  }

  addEmployee(newEmp: Employee): void {
    this.employees.update(list => [newEmp, ...list]);
  }

  getEmployeeByUsername(username: string): Employee | undefined {
    return this.employees().find(e => e.username === username);
  }

  updateEmployee(username: string, updatedData: Employee): void {
    this.employees.update(list =>
      list.map(emp => emp.username === username ? updatedData : emp)
    );
  }

  deleteEmployee(username: string): void {
    this.employees.update(list =>
      list.filter(emp => emp.username !== username)
    );
  }
}

import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { RouterModule } from '@angular/router';
import { EmployeeStore } from '../../store/employee.store';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private employeeService = inject(EmployeeService);
  store = inject(EmployeeStore);

  employees = this.store.pagedEmployees;
  statusList = this.employeeService.statusList;
  groupList = this.employeeService.groupList;

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.store.updateState({ searchTermName: input.value, currentPage: 1 });
  }

  onStatusFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.store.updateState({ searchTermStatus: value, currentPage: 1 });
  }

  onGroupFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.store.updateState({ searchTermGroup: value, currentPage: 1 });
  }

  onPageSizeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.store.updateState({ pageSize: Number(value), currentPage: 1 });
  }

  onSort(column: string) {
    const current = this.store.listState();
    const direction = current.sortColumn === column && current.sortDirection === 'asc' ? 'desc' : 'asc';
    this.store.updateState({ sortColumn: column, sortDirection: direction });
  }

  onDelete(username: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(username);
    }
  }
}

import { computed, inject, Injectable, signal } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee, EmployeeState } from '../../../shared/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeStore {
  private employeeService = inject(EmployeeService);
  private employees = this.employeeService.allEmployees;

  private readonly_initialState: EmployeeState = {
    currentPage: 1,
    pageSize: 10,
    searchTermName: '',
    searchTermGroup: '',
    searchTermStatus: '',
    sortColumn: 'username',
    sortDirection: 'asc',
  };

  private state = signal<EmployeeState>(this.readonly_initialState);
  readonly listState = this.state.asReadonly();

  updateState(newState: Partial<EmployeeState>) {
    this.state.update((state) => ({ ...state, ...newState }));
  }

  resetState() {
    this.state.set(this.readonly_initialState);
  }

  private readonly filteredList = computed(() => {
    const s = this.state();
    const raw = this.employees();

    return raw.filter((e) => {
      const matchesName =
        e.username.toLowerCase().includes(s.searchTermName.toLowerCase()) ||
        `${e.firstName} ${e.lastName}`.toLowerCase().includes(s.searchTermName.toLowerCase()) ||
        e.email.toLowerCase().includes(s.searchTermName.toLowerCase());

      const matchesGroup = !s.searchTermGroup || e.group === s.searchTermGroup;
      const matchesStatus = !s.searchTermStatus || e.status === s.searchTermStatus;
      return matchesName && matchesGroup && matchesStatus;
    });
  });

  private readonly sortedList = computed(() => {
    const s = this.state();
    const list = [...this.filteredList()];

    return list.sort((a, b) => {
      const valA = a[s.sortColumn as keyof Employee];
      const valB = b[s.sortColumn as keyof Employee];
      const modifier = s.sortDirection === 'asc' ? 1 : -1;

      if (valA < valB) return -1 * modifier;
      if (valA > valB) return 1 * modifier;
      return 0;
    });
  });

  readonly pagedEmployees = computed(() => {
    const s = this.state();
    const start = (s.currentPage - 1) * s.pageSize;
    return this.sortedList().slice(start, start + s.pageSize);
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.filteredList().length / this.state().pageSize),
  );
  readonly totalItems = computed(() => this.filteredList().length);
}

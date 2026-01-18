export type EmployeeGroup =
  | 'Engineering'
  | 'HR'
  | 'Finance'
  | 'Marketing'
  | 'Sales'
  | 'Product'
  | 'Design'
  | 'Legal'
  | 'Operations'
  | 'Leadership';
export type EmployeeStatus = 'Active' | 'Resigned' | 'On Leave' | 'Terminated';

export interface Employee {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: EmployeeStatus;
  group: EmployeeGroup;
  description: Date; // saya ga ngerti kenapa description date ?
}

export interface EmployeeState {
  currentPage: number;
  pageSize: number;
  searchTermName: string;
  searchTermGroup: string;
  searchTermStatus: string;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
}

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./layout/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      // harusnya ini overview, untuk project ini di pakai untuk redirect
      { path: '', redirectTo: 'employee', pathMatch: 'full' },
      {
        path: 'employee',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/employee/pages/list/list.component').then((m) => m.ListComponent),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/employee/pages/form/form.component').then((m) => m.FormComponent),
          },
          {
            path: 'edit/:username',
            loadComponent: () =>
              import('./features/employee/pages/form/form.component').then((m) => m.FormComponent),
          },
          {
            path: 'detail/:username',
            loadComponent: () =>
              import('./features/employee/pages/detail/detail.component').then(
                (m) => m.DetailComponent,
              ),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);

  readonly currentUser = signal<string | null>(localStorage.getItem('user_session'));

  readonly isLoggedIn = computed(() => !!this.currentUser());

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.currentUser.set(username);
      localStorage.setItem('user_session', username);
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('user_session');
    this.router.navigate(['/login']);
  }
}

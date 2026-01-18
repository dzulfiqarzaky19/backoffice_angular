import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    }
  }

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage.set(null);

      const { username, password } = this.loginForm.value;
      const success = this.authService.login(username || '', password || '');

      if (!success) {
        this.errorMessage.set('Invalid username or password. Please try again.');
      }
    }
  }
}

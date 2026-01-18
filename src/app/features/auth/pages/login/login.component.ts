import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TextComponent } from '../../../../shared/components/forms/text/text.component';
import { PasswordComponent } from '../../../../shared/components/forms/password/password.component';
import { LucideAngularModule, LayoutDashboard, Info } from 'lucide-angular';
import { TypographyComponent } from '../../../../shared/components/typography/typography.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    TextComponent,
    PasswordComponent,
    LucideAngularModule,
    TypographyComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  readonly LayoutDashboard = LayoutDashboard;
  readonly Info = Info;

  private formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    }

    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage.set(null);
    });
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

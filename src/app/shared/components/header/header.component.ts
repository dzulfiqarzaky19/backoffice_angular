import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TypographyComponent } from '../typography/typography.component';
import { LucideAngularModule, LogOut, LayoutDashboard } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TypographyComponent, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly LogOut = LogOut;
  readonly LayoutDashboard = LayoutDashboard;
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;

  onLogout() {
    this.authService.logout();
  }
}

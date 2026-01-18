import { Component, computed, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Employee } from '../../../../shared/models/employee.model';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { TypographyComponent } from '../../../../shared/components/typography/typography.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  LucideAngularModule,
  ArrowLeft,
  Pencil,
  Mail,
  Calendar,
  CreditCard,
  Briefcase,
  User,
} from 'lucide-angular';

@Component({
  selector: 'app-detail',
  imports: [
    RouterLink,
    DatePipe,
    CurrencyPipe,
    TypographyComponent,
    ButtonComponent,
    LucideAngularModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  readonly ArrowLeft = ArrowLeft;
  readonly Pencil = Pencil;
  readonly Mail = Mail;
  readonly Calendar = Calendar;
  readonly CreditCard = CreditCard;
  readonly Briefcase = Briefcase;
  readonly User = User;

  router = inject(ActivatedRoute);
  employeeService = inject(EmployeeService);
  readonly username = computed(() => this.router.snapshot.paramMap.get('username'));
  readonly employee = computed(() =>
    this.employeeService.getEmployeeByUsername(this.username() || ''),
  );
}

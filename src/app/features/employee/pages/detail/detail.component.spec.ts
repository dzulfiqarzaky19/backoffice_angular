import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { DatePipe, CurrencyPipe, Location } from '@angular/common';
import { DetailComponent } from './detail.component';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent {}

describe('DetailComponent Integration', () => {
  let harness: RouterTestingHarness;
  let component: DetailComponent;
  let fixture: ComponentFixture<unknown>;
  let employeeService: EmployeeService;
  let location: Location;

  const testUsername = 'user1';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        EmployeeService,
        provideRouter([
          { path: 'dashboard/employee/detail/:username', component: DetailComponent },
          { path: 'dashboard/employee', component: DummyComponent },
        ]),
        DatePipe,
        CurrencyPipe,
      ],
    }).compileComponents();

    employeeService = TestBed.inject(EmployeeService);
    location = TestBed.inject(Location);

    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl(
      `dashboard/employee/detail/${testUsername}`,
      DetailComponent,
    );
    fixture = harness.fixture;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display employee details from real service', () => {
    const user = employeeService.getEmployeeByUsername(testUsername);
    expect(user).toBeDefined();

    expect(component.username()).toBe(testUsername);

    const nameElement = fixture.debugElement.query(By.css('.header-title-section app-typography'));
    expect(nameElement).toBeTruthy('Name element should exist');
    expect(nameElement.nativeElement.textContent).toContain(user?.firstName);
    expect(nameElement.nativeElement.textContent).toContain(user?.lastName);

    const emailEl = fixture.debugElement
      .queryAll(By.css('.card-body app-typography'))
      .find((el) => el.nativeElement.textContent.includes(user?.email || ''));
    expect(emailEl).toBeTruthy('Email element should exist');
  });

  it('should navigate back to list when back button is clicked', async () => {
    const backBtn = fixture.debugElement.query(By.css('.back-link'));
    expect(backBtn).toBeTruthy();

    await fixture.ngZone?.run(async () => {
      backBtn.nativeElement.click();
      await fixture.whenStable();
      expect(location.path()).toBe('/dashboard/employee');
    });
  });
});

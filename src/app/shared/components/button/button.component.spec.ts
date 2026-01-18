import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct type', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.attributes['type']).toBe('submit');
  });

  it('should apply disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('should apply full width class', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.classes['btn-full-width']).toBeTrue();
  });

  it('should project content', () => {
    @Component({
      template: '<app-button>Click Me</app-button>',
      imports: [ButtonComponent],
      standalone: true
    })
    class TestHostComponent { }

    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent).toContain('Click Me');
  });
});

import { Component } from '@angular/core';

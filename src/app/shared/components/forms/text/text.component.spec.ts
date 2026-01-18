import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgControl } from '@angular/forms';
import { TextComponent } from './text.component';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
  let ngControlSpy: any;

  beforeEach(async () => {
    ngControlSpy = {
      valueAccessor: null,
      invalid: false,
      dirty: false,
      touched: false,
      errors: null,
    };

    await TestBed.configureTestingModule({
      imports: [TextComponent],
      providers: [{ provide: NgControl, useValue: ngControlSpy }],
    })
      .overrideComponent(TextComponent, {
        add: { providers: [{ provide: NgControl, useValue: ngControlSpy }] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;

    if (ngControlSpy) {
      ngControlSpy.valueAccessor = component;
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label and placeholder', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('placeholder', 'Enter text');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label'));
    const input = fixture.debugElement.query(By.css('input'));

    expect(label.nativeElement.textContent).toContain('Test Label');
    expect(input.attributes['placeholder']).toBe('Enter text');
  });

  it('should write value to input', () => {
    component.writeValue('initial value');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.value).toBe('initial value');
  });

  it('should call onChange when input changes', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'new value';
    input.nativeElement.dispatchEvent(new Event('input'));

    expect(onChangeSpy).toHaveBeenCalledWith('new value');
  });

  it('should call onTouched on blur', () => {
    const onTouchedSpy = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouchedSpy);

    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.dispatchEvent(new Event('blur'));

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should show error message when control is invalid and touched', () => {
    ngControlSpy.invalid = true;
    ngControlSpy.touched = true;
    ngControlSpy.errors = { required: true };

    fixture.componentRef.setInput('label', 'Username');
    fixture.detectChanges();

    const errorMsg = fixture.debugElement.query(By.css('.error-msg'));
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.nativeElement.textContent).toContain('Username is required');
  });
});

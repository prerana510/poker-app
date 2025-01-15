import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';




describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let service: AuthService;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['register']);
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock }, // Use mock service
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    const form = component.registerForm;
    expect(form).toBeTruthy();
    expect(form.get('userName')?.value).toBe('');
    expect(form.get('emailId')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
    expect(form.get('firstname')?.value).toBe('');
    expect(form.get('lastName')?.value).toBe('');
  });

  it('should mark the form as invalid if fields are empty', () => {
    component.registerForm.markAllAsTouched();
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should mark the form as valid if all fields are filled correctly', () => {
    component.registerForm.setValue({
      userName: 'testUser',
      emailId: 'test@example.com',
      password: 'password123',
      firstname: 'Test',
      lastName: 'User',
    });
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should call AuthService.register on form submit with valid data', () => {
    const mockResponse = 'User Added Successfully.';
    authServiceMock.register.and.returnValue(of(mockResponse)); 
    component.registerForm.setValue({
      userName: 'testUser',
      emailId: 'test@example.com',
      password: 'password123',
      firstname: 'Test',
      lastName: 'User',
    });

    component.onSubmit();

    expect(authServiceMock.register).toHaveBeenCalledWith({
      userName: 'testUser',
      emailId: 'test@example.com',
      password: 'password123',
      firstname: 'Test',
      lastName: 'User',
    });
  });

  it('should display success message on successful registration', () => {
    const mockResponse = 'User Added Successfully.';
    authServiceMock.register.and.returnValue(of(mockResponse));// Mocking the service call
  
    component.registerForm.setValue({
      userName: 'testUser',
      emailId: 'test@example.com',
      password: 'password123',
      firstname: 'Test',
      lastName: 'User',
    });
  
    component.onSubmit();
  
    expect(authServiceMock.register).toHaveBeenCalledWith({
      userName: 'testUser',
      emailId: 'test@example.com',
      password: 'password123',
      firstname: 'Test',
      lastName: 'User',
    });
    expect(component.successMessage).toBe('User registered successfully!');
  });
  
  it('should display error message on registration failure', () => {
    const mockError = { message: 'Registration failed.' };
    authServiceMock.register.and.returnValue(throwError(() => mockError));
    component.registerForm.setValue({
      userName: 'testUser',
      emailId: 'test@example.com',
      password: 'password123',
      firstname: 'Test',
      lastName: 'User',
    });

    component.onSubmit();

    expect(component.errorMessage).toBe('Registration failed. Please try again.');
    expect(component.successMessage).toBe('');
  });

  it('should disable the register button if the form is invalid', () => {
    const registerButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    component.registerForm.setValue({
      userName: '',
      emailId: '',
      password: '',
      firstname: '',
      lastName: '',
    });
    fixture.detectChanges();
    expect(registerButton.disabled).toBeTrue();
  });

  it('should enable the register button if the form is valid', () => {
    const registerButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    component.registerForm.setValue({
      userName: 'testUser',
      emailId: 'test@example.com',
      password: 'password123',
      firstname: 'Test',
      lastName: 'User',
    });
    fixture.detectChanges();
    expect(registerButton.disabled).toBeFalse();
  });
});

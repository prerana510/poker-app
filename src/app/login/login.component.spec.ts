import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service'; // Update with correct path
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not call AuthService.login if form is invalid', () => {
    const form = {
      invalid: true,
    } as NgForm;

    component.login(form);

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should call AuthService.login with correct credentials when form is valid', () => {
    const mockResponse = { token: '12345' };
    authService.login.and.returnValue(of(mockResponse));

    component.email = 'test@example.com';
    component.password = 'password123';

    const form = {
      invalid: false,
    } as NgForm;

    component.login(form);

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(component.errorMessage).toBe('');
  });

  it('should display an error message if login fails', () => {
    const mockError = { message: 'Invalid credentials' };
    authService.login.and.returnValue(throwError(mockError));

    component.email = 'test@example.com';
    component.password = 'wrongpassword';

    const form = {
      invalid: false,
    } as NgForm;

    component.login(form);

    expect(component.errorMessage).toBe('Login failed. Please check your credentials and try again.');
  });

  it('should reset errorMessage on successful login', () => {
    const mockResponse = { token: '12345' };
    authService.login.and.returnValue(of(mockResponse));

    component.email = 'test@example.com';
    component.password = 'password123';

    const form = {
      invalid: false,
    } as NgForm;

    component.login(form);

    expect(component.errorMessage).toBe('');
  });
});

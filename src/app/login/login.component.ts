import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// export class LoginComponent {

//   email: string = '';
//   password: string = '';
//   errorMessage: string = '';

//   login(): void {
//     // Regular expressions for validation
//     const alphanumericAndSymbolRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
  
//     if (!this.password || !this.email) {
//       this.errorMessage = 'Please enter valid credentials';
//       return;
//     }
  
//     if (this.password.length !== 8) {
//       this.errorMessage = 'Password should contain exactly 8 characters.';
//       return;
//     }
  
//     if (!alphanumericAndSymbolRegex.test(this.password)) {
//       this.errorMessage =
//         'Password should contain numbers, letters, and at least one special symbol.';
//       return;
//     }
  
//     // If no errors, reset errorMessage and navigate to the dashboard
//     this.errorMessage = '';
//     console.log('login successful');
    
//   }
  


//   constructor(private router: Router) {}


// }


export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // Call the login method from AuthService
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Handle successful login
        console.log('Login successful', response);
          // Redirect to another page after successful login
      },
      (error) => {
        // Handle error during login
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      }
    );
  }
}

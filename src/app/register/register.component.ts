import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
// export class RegisterComponent {

//   username: string = '';
//   firstname: string = '';
//   lastname: string = '';
//   emailId: string = '';
//   password: string = '';
//   errorMessage: string = '';

//   constructor() {}

//   // Method to handle form submission
//   submitForm(): void {
//     // Validate form fields
//     if (this.isFormValid()) {
//       // Handle form submission logic, e.g., send data to the server
//       console.log('Form Submitted');
//       console.log({
//         username: this.username,
//         firstname: this.firstname,
//         lastname: this.lastname,
//         emailId: this.emailId,
//         password: this.password,
//       });
      
//       // Reset form after successful submission
//       this.resetForm();
//     } else {
//       // Set error message if validation fails
//       this.errorMessage = 'Please fill in all required fields correctly.';
//     }
//   }

//   // Helper method to validate the form
//   private isFormValid(): boolean {
//     // Ensure all fields are non-empty
//     return (
//       this.username.trim() !== '' &&
//       this.firstname.trim() !== '' &&
//       this.lastname.trim() !== '' &&
//       this.emailId.trim() !== '' &&
//       this.password.trim() !== ''
//     );
//   }

//   // Helper method to reset the form
//   private resetForm(): void {
//     this.username = '';
//     this.firstname = '';
//     this.lastname = '';
//     this.emailId = '';
//     this.password = '';
//     this.errorMessage = '';
//   }

// }

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  successMessage: string = ''; // Declare successMessage
  errorMessage: string = ''; // Declare errorMessage (optional)

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'User registered successfully!';
          this.errorMessage = ''; // Clear any previous error message
          console.log(response);
        },
        error: (err) => {
          this.errorMessage = 'Registration failed. Please try again.';
          this.successMessage = ''; // Clear any previous success message
          console.error(err);
        },
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}

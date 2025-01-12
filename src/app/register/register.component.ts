import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  firstname: string = '';
  lastname: string = '';
  emailId: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor() {}

  // Method to handle form submission
  submitForm(): void {
    // Validate form fields
    if (this.isFormValid()) {
      // Handle form submission logic, e.g., send data to the server
      console.log('Form Submitted');
      console.log({
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        emailId: this.emailId,
        password: this.password,
      });
      
      // Reset form after successful submission
      this.resetForm();
    } else {
      // Set error message if validation fails
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  // Helper method to validate the form
  private isFormValid(): boolean {
    // Ensure all fields are non-empty
    return (
      this.username.trim() !== '' &&
      this.firstname.trim() !== '' &&
      this.lastname.trim() !== '' &&
      this.emailId.trim() !== '' &&
      this.password.trim() !== ''
    );
  }

  // Helper method to reset the form
  private resetForm(): void {
    this.username = '';
    this.firstname = '';
    this.lastname = '';
    this.emailId = '';
    this.password = '';
    this.errorMessage = '';
  }

}

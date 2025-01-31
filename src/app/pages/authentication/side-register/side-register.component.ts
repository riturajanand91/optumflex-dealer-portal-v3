import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AuthService } from '../../../services/auth.service';
import { ToastifyService } from '../../../services/toastify.service';
import { LoggerService } from 'src/app/services/logger.service';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
  styleUrl: './side-register.component.scss',
})
export class AppSideRegisterComponent {
  form = new FormGroup({
    first_name: new FormControl('Angular test'),
    last_name: new FormControl('user'),
    username: new FormControl('angulartestuser'),
    email: new FormControl('angulartest@yopmail.com'),
    password: new FormControl('Test@123'),
    confirm_password: new FormControl('Test@123'),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastify: ToastifyService,
    private logger: LoggerService,
    public metaService: MetaService
  ) {
    this.logger.info('AppSideRegisterComponent initialized');
  }

  get f() {
    return this.form.controls;
  }

  public submit(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if the form is valid
      if (!this.form.valid) {
        this.toastify.showError('Please fill out the form correctly.', 'Validation Error');
        return reject('Form validation failed');
      }
  
      // Destructure form values
      const { first_name, last_name, username, email, password, confirm_password } = this.form.value;
  
      // Check if password and confirm password match
      // if (password !== confirm_password) {
      //   this.toastify.showError('Passwords do not match.', 'Validation Error');
      //   return reject('Passwords do not match');
      // }
  
      // Log the form data for debugging
      this.logger.debug('Registration form submitted', {first_name, last_name, username, email, password, confirm_password });
  
      // Call the register method from the auth service with form data
      this.authService.register(first_name, last_name, username, email, password, confirm_password).then(
        (response) => {
          this.logger.info('Registration successful', response);
  
          // Show success notification
          this.toastify.showSuccess('Registration Successful!', 'Success');
  
          // Navigate to home or a different page
          this.router.navigate(['/']);
          resolve();
        },
        (error) => {
          // Log the error and show the user a friendly message
          this.logger.error('Registration failed', error);
          this.toastify.showError(error.message, 'Error');
          reject(error);
        }
      ).catch((unexpectedError) => {
        // Handle any unexpected errors
        this.logger.error('Unexpected error during Registration', unexpectedError);
        this.toastify.showError('An unexpected error occurred. Please try again.', 'Error');
        reject(unexpectedError);
      });
    });
  }
  
}

import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { ToastifyService } from '../../../services/toastify.service';
import { LoggerService } from 'src/app/services/logger.service';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,

  ],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent {
  public portalInfo: any;
  activeTab: string = 'login'; //tab as login/signup

  public loginForm = new FormGroup({
    username: new FormControl('Aayush'),
    password: new FormControl('Test@123'),
  });

  public registerForm = new FormGroup({
    first_name: new FormControl('John'),
    last_name: new FormControl('Doe'),
    username: new FormControl('johnDoe2025'),
    email: new FormControl('pojes72350@lassora.com'),
    password: new FormControl('Admin@12345'),
    confirm_password: new FormControl('Admin@12345'),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastify: ToastifyService,
    private logger: LoggerService,
    public metaService: MetaService
  ) {
    this.logger.info('AppSideLoginComponent initialized');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tab = params['tab'];
      if (tab) {
        this.activeTab = tab;
      }
    });
  }

  public submitLogin(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.loginForm.valid) {
        this.toastify.showError('Please fill out the form correctly.', 'Validation Error');
        return reject('Form validation failed');
      }

      const { username, password } = this.loginForm.value;
      this.logger.debug('Login form submission', { username });
      this.authService.login(username, password).then(
        (response) => {
          this.logger.info('Login successful', { username });
          // Store token and user details in local storage
          this.authService.setToken(response.accessToken);
          this.authService.setUser(JSON.stringify(response.user));

          this.toastify.showSuccess(response?.msg, 'Success');
          this.router.navigate(['/']);
          resolve();
        },
        (error) => {
          // Log the error and show the user a friendly message
          this.logger.error('Login API call failed', error);
          this.toastify.showError(error.message, 'Error');
          reject(error);
        }
      ).catch((unexpectedError) => {
        // Handle any unexpected errors
        this.logger.error('Unexpected error during login', unexpectedError);
        this.toastify.showError('An unexpected error occurred. Please try again.', 'Error');
        reject(unexpectedError);
      });
    });
  }

  public submitRegister(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if the form is valid
      if (!this.registerForm.valid) {
        this.toastify.showError('Please fill out the form correctly.', 'Validation Error');
        return reject('Form validation failed');
      }
  
      // Destructure form values
      const { first_name, last_name, username, email, password, confirm_password } = this.registerForm.value;
  
      // Log the form data for debugging
      this.logger.debug('Registration form submitted', { first_name, last_name, username, email, password, confirm_password });
  
      // Call the register method from the auth service with form data
      this.authService.register(first_name, last_name, username, email, password, confirm_password).then(
        (response) => {
          console.log(response)
          this.logger.info('Registration successful', response.msg);
  
          // Show success notification
          this.toastify.showSuccess(response.msg, 'Success');
  
          // Navigate to home or a different page
          this.router.navigate(['/authentication']);
          resolve();
        },
        (error) => {
          console.log(error)
          // Log the error and show the user a friendly message
          this.logger.error('Registration failed', error);
          this.toastify.showError(error.message, 'Error');
  
          // Display detailed form errors if available
          if (error.errors && error.errors.length > 0) {
            error.errors.forEach((err: any) => {
              this.toastify.showError(err.message, 'Validation Error');
            });
          }
  
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

  public setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}

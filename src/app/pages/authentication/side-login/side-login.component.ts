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
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { ToastifyService } from '../../../services/toastify.service';
import { LoggerService } from 'src/app/services/logger.service';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,

  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  public portalInfo: any;

  form = new FormGroup({
    username: new FormControl('Aayush'),
    password: new FormControl('Test@123'),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastify: ToastifyService,
    private logger: LoggerService,
    public metaService: MetaService
  ) {
    this.logger.info('AppSideLoginComponent initialized');
  }

  get f() {
    return this.form.controls;
  }

  public submit(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.form.valid) {
        this.toastify.showError('Please fill out the form correctly.', 'Validation Error');
        return reject('Form validation failed');
      }

      const { username, password } = this.form.value;
      this.logger.debug('Login form submission', { username });
      this.authService.login(username, password).then(
        (response) => {
           let sc= {
              "msg": "Login Successfull....!",
              "status_code": 202,
              "accessToken": "mtdpbo7bzqv7nb7ve0pt70hcznb5jfw4",
              "user": {
                  "id": 53,
                  "username": "Aayush",
                  "first_name": "Aayush",
                  "last_name": "Tanwar",
                  "email": "ashishkummar4@hotmail.com",
                  "role": "moderator"
              }
          }
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
}

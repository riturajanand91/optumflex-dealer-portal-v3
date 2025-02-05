import { LoggerService } from 'src/app/services/logger.service';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from '../../../validators/password-match.validator';
import { ToastifyService } from 'src/app/services/toastify.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: { name: string; avatar: string; role: string; email: string } | null = null;
  passwordForm: FormGroup;
  profileForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastify: ToastifyService,
    private logger: LoggerService,
    private utilityService: UtilityService
  ) {
    const userData: any = this.authService.getUser();
    console.log(userData)
    if (userData) {
      this.user = {
        name: userData.first_name + ' ' + userData.last_name,
        avatar: `https://ui-avatars.com/api/?name=${userData.first_name}&background=random`,
        role: userData.role,
        email: userData.email,
      };
      console.log(this.user)
      this.logger.info(`User ${userData.name} is logged in.`);
    } else {
      this.logger.warn('No user is currently logged in.');
    }
  }
  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: passwordMatchValidator() }  // Add the custom validator here for form group
    );
    this.profileForm = this.fb.group({
      name: [this.user?.name, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]],
    });
  }
  // ngOnInit() {
  //   this.passwordForm = this.fb.group({
  //     currentPassword: ['', Validators.required],
  //     newPassword: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  //   },
  //     { validators: passwordMatchValidator() }  // Add the custom validator here
  //   );
  //   
  // }

  onSubmit() {
    try {
      // Check if password form is valid
      if (this.passwordForm.valid) {
        const changePassword = {
          password1: this.passwordForm.value.newPassword,
          password2: this.passwordForm.value.confirmPassword
        };

        this.authService.updatePassword(changePassword.password1, changePassword.password2).subscribe(
          (resData) => {
            // Handle success response
            this.logger.info('Password updated successfully:', resData);
            this.toastify.showSuccess(resData.message || 'Password updated successfully!');
            this.utilityService.navigateTo('/'); // Navigate to a different route
          },
          (error) => {
            // Handle HTTP error response
            this.logger.error('Error changing password:', error);
            const errorMessage = error.error?.message || 'Failed to update password. Please try again.';
            this.toastify.showError(errorMessage);
          }
        );
      } else {
        // If the form is invalid, show a toast or alert to inform the user.
        this.toastify.showError('Please fill in all fields correctly.');
      }

      // Check if the profile form is valid (Optional code block)
      if (this.profileForm.valid) {
        // You can handle form submission or logging here if necessary
        console.log(this.profileForm.value);
      }

    } catch (error) {
      // Catch any unexpected errors (e.g., programming errors)
      this.logger.error('Unexpected error occurred during form submission:', error);
      this.toastify.showError('An unexpected error occurred. Please try again later.');
    }
  }


}

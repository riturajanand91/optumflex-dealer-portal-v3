import { LoggerService } from 'src/app/services/logger.service';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from '../../../validators/password-match.validator';
import { ToastifyService } from 'src/app/services/toastify.service';
import { UtilityService } from 'src/app/services/utility.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';

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
  public user: any = null;
  public passwordForm: FormGroup;
  public profileForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastify: ToastifyService,
    private logger: LoggerService,
    private httpService: HttpService,
    private utilityService: UtilityService,
    private sanitizer: DomSanitizer
  ) {
    const userData: any = this.authService.getUser();
    if (userData) {
      this.user = {
        name: userData.first_name + ' ' + userData.last_name,
        avatar: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${userData.image}`),
        // avatar: `https://ui-avatars.com/api/?name=${userData.first_name}&background=random`,
        role: userData.role,
        email: userData.email,
        phone: userData.phone,
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
      { validators: passwordMatchValidator() }
    );

    this.profileForm = this.fb.group({
      name: [{ value: this.user?.name, disabled: true }],
      phone: [this.user?.phone, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]],
    });

  }


  public onSubmit() {
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

  public onUpdateProfile() {
    this.logger.info('Submitting Profile form');
    const payload = {
      email_address: this.profileForm.value.email,
      phone: this.profileForm.value.phone
    };
    this.logger.info('Submitting Form For Update Profile:', payload);
    this.httpService.updateProfile(payload).subscribe(
      res => {
        this.logger.info('Profile updated successfully', { message: res.msg });
        this.toastify.showSuccess(res.msg);
        this.ngOnInit();
      },
      error => {
        this.logger.error('Error updating Profile', { error });
        console.error('Error updating Profile:', error);
        this.toastify.showError('Failed to update Profile');
      }
    );
  }

}

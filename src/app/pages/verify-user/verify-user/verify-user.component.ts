import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoggerService } from 'src/app/services/logger.service';
import { ToastifyService } from 'src/app/services/toastify.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-verify-user',
  standalone: true,
  imports: [],
  templateUrl: './verify-user.component.html',
  styleUrl: './verify-user.component.scss'
})
export class VerifyUserComponent implements OnInit {
  public domain: string;
  constructor(
    private utilityService: UtilityService,
    private authService: AuthService,
    private toastify: ToastifyService,
    private logger: LoggerService
  ) {
    this.domain = this.utilityService.extractBrowserDomain();
  }

  ngOnInit() {
    this.emailVerification();
  }

  public emailVerification() {
    this.logger.info('Submitting form data to server');
    // let link = "http://www.optumflex.live:8000/Users/activate/NzA/ckfwuj-1f537b520e4a1a5e36cfdce56fd0283e/"
    const userId = this.extractUser(this.domain);
    this.authService.verifyEmail(this.domain,userId).subscribe(
      resData => {
        this.logger.info('Email verified successfully', { message: resData.message });
        // console.log(resData.message);
        this.toastify.showSuccess(resData.message);
        this.utilityService.navigateTo('/');
      },
      error => {
        this.logger.error('Error verifying email', { error });
        console.error('Error verifying email:', error);
        this.toastify.showError('Failed to verify email');
      }
    );
  }

  public extractUser(url: string): string | null {
    try {
      const regex = /\/Users\/activate\/([^\/]+)\//; // Matches the part after '/Users/activate/' and before the next slash
      const match = url.match(regex);

      if (match) {
        return match[1]; // Return the matched part (e.g., "NzA")
      } else {
        console.log('No match found');
        return null; // Return null if no match is found
      }
    } catch (error) {
      console.error('Error extracting user:', error);
      return null; // Return null in case of an error
    }
  }

}

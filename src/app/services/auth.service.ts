import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastifyService } from './toastify.service';
import { environment } from '../../environments/environment';
import { LoggerService } from './logger.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from './meta.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authurl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private toastify: ToastifyService,
    private logger: LoggerService,
    private router: Router,
    private CookieService: CookieService,
    private MetaService: MetaService
  ) {
    // Log service initialization
    this.logger.debug('AuthService initialized', { apiUrl: this.authurl });
  }

  // Register a new user
  public register(first_name: string, last_name: string, username: string, email: string, password: string, confirm_password: string): Promise<any> {
    this.logger.info('Attempting to register user', { first_name, last_name, username, email, password, confirm_password });
    const csrfToken = document.querySelector('[name=csrf]')?.getAttribute('value');
    console.log(csrfToken)
    return new Promise((resolve, reject) => {
      this.http.put(`${this.authurl}/Signup`, { first_name, last_name, username, email, password, confirm_password }, {}).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject({
            status: err.status,
            message: err.error?.message || 'Something went wrong. Please try again.',
          });
        }
      );
    });
  }

  public login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // const headers = new HttpHeaders({
      //   'X-Admin-Portal': 'true', // Adding a custom header for admin portal
      // });
      this.logger.info('Attempting to Login user', { username, password });
      this.http.post(`${this.authurl}/login`, { username, password }).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject({
            status: err.status,
            message: err.error?.message || 'Something went wrong. Please try again.',
          });
        }
      );
    });
  }

  public logout(): Promise<void> {
    // this.cleanupSession()
    return new Promise((resolve, reject) => {
      this.http.put(`${this.authurl}/logout`,
        { confirm_logout: "True" },
      ).subscribe(
        () => {
          this.toastify.showSuccess('You have been logged out successfully.', 'Success');
          this.cleanupSession()
          resolve();
        },
        (err) => {
          this.toastify.showError(
            err.error?.message || 'Failed to log out. Please try again.',
            'Error'
          );
          reject({
            status: err.status,
            message: err.error?.message || 'Failed to log out. Please try again.',
          });
        }
      );
    });
  }

  updatePassword(password1: string, password2: string): Observable<any> {
    const payload = { password1, password2 }; // Combine passwords into a single object
    this.logger.info('Updating Password', payload); // Log the payload
    return this.http.put<any>(`${environment.baseUrl}/Password/Reset`, payload) // Send both passwords in the request body
      .pipe(catchError(this.handleError.bind(this)));
  }

  verifyEmail(domain: any, userId: any): Observable<any> {
    this.logger.info('Verifying user via Email', { userId });
    return this.http.post<any>(`${environment.baseUrl}/verify`, domain, userId)
      .pipe(catchError(this.handleError.bind(this)));
  }


  /**
     * Utility to clean up session by clearing local storage
     * and any additional cleanup tasks.
     */
  private cleanupSession(): void {
    localStorage.clear();
    window.location.href = this.MetaService.portalInfo.loginRedirect;
    // Additional cleanup logic can be added here.
  }

  // Store token in local storage
  setToken(token: string): void {
    this.logger.debug('Setting access token');
    localStorage.setItem('accessToken', token);
  }

  // Get token from local storage
  getToken(): string | null {
    const token = localStorage.getItem('accessToken');
    this.logger.debug('Retrieved access token', { exists: !!token });
    return token;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    const isLoggedIn = this.getToken() !== null;
    this.logger.info('Checked login status', { isLoggedIn });
    return isLoggedIn;
  }

  // Store user details in local storage
  setUser(userInfo: any): any {
    console.log(userInfo)
    this.logger.debug('Setting user info', { userInfo });
    localStorage.setItem('userInfo', userInfo);
  }

  // Retrieve user details from local storage
  getUser(): { id: string; name: string; email: string, role: string } | null {
    const userInfo = localStorage.getItem('userInfo');
    this.logger.debug('Retrieved user info', { exists: !!userInfo });
    return userInfo ? JSON.parse(userInfo) : null;
  }

  getUserRole(): string {
    let role: any = localStorage.getItem('userInfo')
    let roleData = JSON.parse(role)
    return roleData.role
  }
  // // Check if the JWT token has expired
  // // Check if the token is expired
  // public isTokenExpired(): boolean {
  //   const tokenExpiry = localStorage.getItem('tokenExpiry');
  //   if (tokenExpiry) {
  //     const expiryTime = parseInt(tokenExpiry, 10);
  //     const currentTime = new Date().getTime();
  //     return currentTime > expiryTime;
  //   }
  //   return true;
  // }

  // Error handling method
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    console.log('Error details:', error); // Log full error details for debugging

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error && error.error.message) {
        // If the backend provides a specific error message
        errorMessage = error.error.message;
      } else {
        // Generic fallback message for server-side errors
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    // Log the error message
    this.logger.error('Auth service error', { error: errorMessage });

    // Show error notification
    this.toastify.showError(errorMessage, 'Error');

    // Return an observable with the error message
    return throwError(() => new Error(errorMessage));
  }

}

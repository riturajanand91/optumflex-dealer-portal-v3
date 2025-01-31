import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ToastifyService } from "../services/toastify.service";
import { Router } from "@angular/router";
import { catchError, Observable, tap, throwError } from "rxjs";
import { CookieService } from 'ngx-cookie-service'; // Import CookieService

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toastify: ToastifyService,
    private router: Router,
    private cookieService: CookieService // Inject CookieService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    const csrftoken = localStorage.getItem('csrftoken');
    const domain = window.location.hostname; // Get the domain
    const csrfToken = this.cookieService.get("csrftoken"); // Read CSRF token from cookie
    console.log(csrfToken)
    // let headers = req.headers;
    // if (csrfToken) {
    //   headers = headers.set("X-CSRFToken", csrfToken); // Add CSRF token to headers
    // }
    // Retrieve CSRF token from the cookie
    // const csrfToken = this.cookieService.get('csrftoken'); // Replace 'X-CSRFToken' with your actual cookie name

    // Add headers, including CSRF token if it exists
    let headers = req.headers.set('X-Domain', domain);  // Always add the domain header

    if (token) {
      headers = headers.set('sessionid', token);  // Add sessionId if token exists
    }
    console.log(csrftoken)
    if (csrftoken) {
      headers = headers.set('X-CSRFToken', csrftoken);  // Add CSRF token if it exists
    }

    // Clone the request with the updated headers
    const requestWithHeaders = req.clone({ headers });

    return next.handle(requestWithHeaders).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log('HTTP Response:', event);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);

        // Specific error handling
        switch (error.status) {
          case 401: // Unauthorized
            this.toastify.showError('Session expired. Please log in again.', 'Unauthorized');
            this.authService.logout(); // Clear session and tokens
            this.router.navigate(['/authentication/login']);
            break;

          case 403: // Forbidden
            this.toastify.showError('You do not have permission to perform this action.', 'Access Denied');
            break;

          case 404: // Not Found
            this.toastify.showError('The requested resource was not found.', 'Not Found');
            break;

          case 500: // Internal Server Error
            this.toastify.showError('A server error occurred. Please try again later.', 'Server Error');
            break;

          default: // Other errors
            this.toastify.showError(error.error?.message || 'An unexpected error occurred.', 'Error');
        }

        // Re-throw the error so it can be handled downstream if necessary
        return throwError(() => error);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust the path as necessary
import { ToastifyService } from '../services/toastify.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private toastify: ToastifyService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Allow access if logged in
    } else {
      this.router.navigate(['/authentication/login']); // Redirect to login if not logged in
      this.toastify.showWarning("Please Authenticate", 'Warning'); // Use showSuccess for error messages
      return false; // Prevent access
    }
  }
}
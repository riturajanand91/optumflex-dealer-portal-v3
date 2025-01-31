import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles']; // Fetch the role required for this route
    const userRole = this.authService.getUserRole();
    if (expectedRoles.includes(userRole)) {
        return true;
      }

    // Redirect to unauthorized page or login
    this.router.navigate(['/unauthorized']);
    return false;
  }
}

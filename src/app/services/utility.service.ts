import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private router: Router) { }
  navigateTo(route: string, params?: any): void {
    if (params) {
      console.log(params);
      this.router.navigate([route], { queryParams: params });
    } else {
      this.router.navigate([route]);
    }
  }

  navigateToParams(route: string, param: string): void {
    this.router.navigate([`${route}/${param}`]);
  }
  extractBrowserDomain(): string {
    const domain = window.location.hostname;  // Extracts the domain name (e.g., www.example.com)
    return domain;
  }
}
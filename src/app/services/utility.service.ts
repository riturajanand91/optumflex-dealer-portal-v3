import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';

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

  public convertDateTime(dateString: string): string {
    return moment.utc(dateString)  // Parse as UTC
      .add(5, 'hours')           // Add 5 hours
      .add(30, 'minutes')        // Add 30 minutes
      .format('DD-MM-YYYY hh:mm:ss A');  // Format with date and time (AM/PM)
  }

  // Method to get CSS class based on progress_status
  public getBadgeClass(progressStatus: string): string {
    switch (progressStatus) {
      case '':
        return 'bg-light-accent text-accent';
      case 'Manual Order Placed':
      case 'Order Placed':
      case 'Buy':
        return 'bg-light-primary text-primary';
      case 'Manual Square Off':
      case 'Sell':
        return 'bg-light-warning text-warning';
      case 'Order Rejected':
      case 'Loss Booked':
        return 'bg-light-error text-error';
      case 'Profit Booked':
        return 'bg-light-success text-success';
      default:
        return '';
    }
  }
}
import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MetaService } from './meta.service';

@Injectable({ providedIn: 'root' })
export class NavService {

  public currentUrl = new BehaviorSubject<any>(undefined);

  constructor(private router: Router, private titleService: Title, private metaService: MetaService) {
    // Subscribe to router events and set the title whenever the route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // Only process NavigationEnd events
    ).subscribe(() => {
      const currentRoute = this.router.routerState.snapshot.root;  // Get the current route
      const title = this.getRouteTitle(currentRoute);  // Retrieve the title from the route's data
      this.titleService.setTitle(title);  // Set the document title
      this.currentUrl.next(currentRoute);  // Optionally, update current URL
    });
  }

  private getRouteTitle(route: any): string {
    let title = 'Default Page Title';  // Fallback title if no title is found
    // Traverse the route tree to find the title in route data
    while (route.firstChild) {
      route = route.firstChild;
    }
    // Check if the title exists in the route's data
    if (route.data && route.data['title']) {
      title = route.data['title'] + " | " + this.metaService?.portalInfo?.companyName;
    }
    return title;
  }
}

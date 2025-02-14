import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from 'src/app/services/auth.service';
import { LoggerService } from 'src/app/services/logger.service';
import { UtilityService } from 'src/app/services/utility.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MetaService } from 'src/app/services/meta.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Subscription } from 'rxjs';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TablerIconsModule,
  ],
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TopNavigationComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();

  public user: any;
  navItems: any = [
    {
      displayName: 'Dashboard',
      iconName: 'layout-grid-add',
      route: '/dashboard',
    },
    {
      displayName: 'Trade View',
      iconName: 'border-all',
      route: '/trading',
    },
    {
      displayName: 'Subscriptions',
      iconName: 'brand-stripe',
      route: '/account/subscription',
    },
    {
      displayName: 'Account',
      iconName: 'user-circle',
      route: '/account',
    },
  ];
  ;
  private layoutChangesSubscription = Subscription.EMPTY;
  public isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  private htmlElement!: HTMLHtmlElement;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  constructor(
    private authService: AuthService,
    private logger: LoggerService,
    private utilityService: UtilityService,
    private breakpointObserver: BreakpointObserver,
    public metaService: MetaService
  ) {
    const userData: any = this.authService.getUser();
    if (userData) {
      this.user = {
        name: userData.first_name + ' ' + userData.last_name,
        avatar: `https://ui-avatars.com/api/?name=${userData?.first_name + ' ' + userData?.last_name}&background=random`,
        role: userData.role,
        email: userData.email,
      };
      this.logger.info(`User ${this.user?.name} is logged in.`);
    } else {
      this.logger.warn('No user is currently logged in.');
    }

    this.htmlElement = document.querySelector('html')!;
    this.htmlElement.classList.add('light-theme');
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW])
      .subscribe((state) => {
        this.isMobileScreen = state.breakpoints[MOBILE_VIEW];
        this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
        if (!this.isMobileScreen && this.menuTrigger.menuOpen) {
          this.menuTrigger.closeMenu();
        }
      });
  }

  ngOnInit(): void { }

  logout() {
    this.authService.logout();
  }

  navigateTo() {
    this.utilityService.navigateTo('/account');
  }
}
import { UtilityService } from 'src/app/services/utility.service';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from '../../../material.module';
import { RouterModule } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Import Router for navigation
import { LoggerService } from 'src/app/services/logger.service'; // Import LoggerService
import { NotificationDialogComponent } from './../../../components/notification-dialog/notification-dialog.component';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,  
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: { name: string; avatar: string; role: string; email: string } | null = null;
  notifications: string[] = [
    'New comment on your post.',
    'Server maintenance scheduled for tonight.',
    'You have a new follower.',
  ];

  constructor(
    private authService: AuthService,
    private logger: LoggerService,
    private dialog: MatDialog,
    private overlay: Overlay,
    private utilityService: UtilityService,
  ) {
    const userData:any = this.authService.getUser();
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
  }

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  logout() {
    this.authService.logout(); // Call the logout method
  }

  openNotifications() {
    this.dialog.open(NotificationDialogComponent, {
      data: this.notifications,
      width: '400px',
    });
  }

  openNotificationsWithOverlay(event: MouseEvent) {
    const overlayRef: OverlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(event.target as HTMLElement)
        .withPositions([
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
            offsetY: 30,
          },
        ])
        .withPush(false),
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
    });

    const injector = Injector.create({
      providers: [{ provide: 'MAT_DIALOG_DATA', useValue: this.notifications }],
    });

    const notificationPortal = new ComponentPortal(
      NotificationDialogComponent,
      null,
      injector
    );
    overlayRef.attach(notificationPortal);

    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }

  public navigateTo(){   
    this.utilityService.navigateTo('/account');
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationService } from './../../services/notification.service';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-notification-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    TablerIconsModule
  ],
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {
  notifications: any[] = [];
  unreadCount:any
  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    // this.fetchNotifications();
    console.log('Notification Dialog initialized');
  }
  
  fetchNotifications(): void {
    this.notificationService.getNotifications().subscribe((data) => {
      this.notifications = data.notifications;
      this.unreadCount = data.unreadCount;
      console.log(this.notifications);
    });
  }

  markAsRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      // Instead of filtering out, update the 'read' status of the notification
      const updatedNotifications = this.notifications.map((notification) => {
        if (notification._id === notificationId) {
          return { ...notification, read: true };
        }
        return notification;
      });
      this.notifications = updatedNotifications; // Update the notifications array
    });
  }
}

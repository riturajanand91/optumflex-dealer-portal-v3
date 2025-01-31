import { CommonModule } from '@angular/common';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) { }
  ngOnInit(): void {
    // Get existing notifications from the service
    // Listen for new notifications and add them to the existing list
    // this.notificationService.onNewComment().subscribe((data) => {
    //   console.log('New comment notification:', data);
    //   this.notifications = data; // This will contain all notifications (existing + new)
    // });
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { ToastifyService } from './toastify.service'; // Assuming you have a Toastify service for notifications
import { LoggerService } from './logger.service'; // Import LoggerService

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = environment.baseUrl + environment.endpoints.notification;
  private socket: Socket;
  constructor(
    private http: HttpClient,
    private toastify: ToastifyService,
    private logger: LoggerService
  ) {
    this.socket = io(environment.baseUrl, {
      transports: ['websocket', 'polling'],
    });
  }

  // This is node api logic to show notifications in top header icon
  // Fetch unread notifications
  getNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Mark a notification as read
  markAsRead(notificationId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${notificationId}/read`, {});
  }
  // This is node api logic to show notifications in top header icon

  // Socket io
  // Listen for new comments
  onNewComment(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('new-comment', (data) => {
        console.log('New comment notification:', data);
        this.logger.info('New comment notification:',data);

        this.toastify.showInfo(data.message); // Show error notification

        observer.next(data);
      });
    });
  }

  // Emit custom events if needed
  emitEvent(event: string, data: any): void {
    this.socket.emit(event, data);
  }
}

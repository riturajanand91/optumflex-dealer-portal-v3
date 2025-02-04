import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastifyService } from './toastify.service'; // Assuming you have a Toastify service for notifications
import { environment } from '../../environments/environment';
import { LoggerService } from './logger.service'; // Import LoggerService

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private postUrl = environment.baseUrl + environment.endpoints.posts;
  private configUrl = environment.baseUrl + environment.endpoints.utility;
  private dashUrl = environment.baseUrl + environment.endpoints.dashboard;
  private commentsUrl = environment.baseUrl + environment.endpoints.comments;
  private usersUrl = environment.baseUrl + environment.endpoints.users;

  private verifyUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private toastify: ToastifyService,
    private logger: LoggerService // Inject LoggerService
  ) {
    this.logger.debug('HttpService initialized', { postUrl: this.postUrl, configUrl: this.configUrl });
  }

  getStats(): Observable<any> {
    this.logger.info('Fetching getStats');
    return this.http.get<any>(`${this.dashUrl}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  
  public getTradeStats(payload: any): Observable<any> {
    this.logger.info('Fetching trade stats with pagination via POST', payload);

    return this.http.post<any>(`${this.usersUrl}/trade-stats`, payload).pipe(
      catchError((error) => {
        this.logger.error('Error fetching trade stats', error);
        return this.handleError(error);
      })
    );
  }


  // Update an existing post
  updateUser(id: string, status: any): Observable<any> {
    console.log(status)
    this.logger.info('Updating Comment Status', { id, status });
    return this.http.post<any>(`${this.usersUrl}/${id}`, { status: status })
      .pipe(catchError(this.handleError.bind(this)));
  }
  // Delete a post
  deleteUser(id: string): Observable<any> {
    this.logger.info('Deleting Comment', { id });
    return this.http.delete<any>(`${this.usersUrl}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  // Routes related to dealer portal
  // Create a new post



  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    this.logger.error('HTTP request error', { error: errorMessage });
    this.toastify.showError(errorMessage); // Show error notification
    return throwError(() => new Error(errorMessage));
  }
}

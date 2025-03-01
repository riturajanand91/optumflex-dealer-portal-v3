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
  private dashUrl = environment.baseUrl + environment.endpoints.dashboard;
  private usersUrl = environment.baseUrl + environment.endpoints.users;
  private verifyUrl = environment.baseUrl;
  private tradeDataUrl = environment.baseUrl + environment.endpoints.tradeData
  private subsUrl = environment.baseUrl + environment.endpoints.subscriptions;
  private profileUrl = environment.baseUrl + environment.endpoints.profile;
  constructor(
    private http: HttpClient,
    private toastify: ToastifyService,
    private logger: LoggerService // Inject LoggerService
  ) {
    this.logger.debug('HttpService initialized', { configUrl: 'this.configUrl' });
  }
  // For all the tabular data
  public getTradeData(payload: any): Observable<any> {
    this.logger.info('Fetching trade tabular Data', payload);
    return this.http.post<any>(`${this.tradeDataUrl}`, payload).pipe(
      catchError((error) => {
        this.logger.error('Error fetching trade stats', error);
        return this.handleError(error);
      })
    );
  }

  public getStats(): Observable<any> {
    this.logger.info('Fetching getStats');
    return this.http.get<any>(`${this.dashUrl}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  public getSubscription(payload: any): Observable<any> {
    this.logger.info('Fetching subscription data', payload);
    return this.http.post<any>(`${this.subsUrl}`, payload).pipe(
      catchError((error) => {
        this.logger.error('Error fetching trade stats', error);
        return this.handleError(error);
      })
    );
  }

  public updateSubscription(payload: any): Observable<any> {
    this.logger.info('Updating Subscription', { payload });
    return this.http.put<any>(`${this.subsUrl}`, payload)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Update profile
  public updateProfile(payload:any): Observable<any> {
    console.log(status)
    this.logger.info('Updating Comment Status',  payload );
    return this.http.put<any>(`${this.profileUrl}`, payload)
      .pipe(catchError(this.handleError.bind(this)));
  }

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

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

  // Get all posts with pagination
  getPosts(page: number = 1, limit: number = 10): Observable<any> {
    this.logger.info('Fetching posts with pagination', { page, limit });
    return this.http.get<any>(`${this.postUrl}?page=${page}&limit=${limit}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Get a single post by uid
  getPost(uid: string): Observable<any> {
    this.logger.info('Fetching post by UID', { uid });
    return this.http.get<any>(`${this.postUrl}/${uid}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Create a new post
  createPost(postData: any): Observable<any> {
    this.logger.info('Creating new post', { postData });
    return this.http.post<any>(`${this.postUrl}/create`, postData)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Update an existing post
  updatePost(id: string, postData: any): Observable<any> {
    this.logger.info('Updating post', { id, postData });
    return this.http.put<any>(`${this.postUrl}/${id}`, postData)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Delete a post
  deletePost(id: string): Observable<any> {
    this.logger.info('Deleting post', { id });
    return this.http.delete<any>(`${this.postUrl}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Update configuration data
  updateConfig(configData: any): Observable<any> {
    this.logger.info('Updating configuration', { configData });
    return this.http.put<any>(`${this.configUrl}/modify`, configData)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Get configuration data
  getConfig(): Observable<any> {
    this.logger.info('Fetching configuration data');
    return this.http.get<any>(`${this.configUrl}/masterData`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  getStats(): Observable<any> {
    this.logger.info('Fetching getStats');
    return this.http.get<any>(`${this.dashUrl}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  getComments(page: number = 1, limit: number = 10): Observable<any> {
    this.logger.info('Fetching comments with pagination', { page, limit });
    return this.http.get<any>(`${this.commentsUrl}?page=${page}&limit=${limit}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  // Update an existing post
  updateCommentStatus(id: string, status: any): Observable<any> {
    console.log(status)
    this.logger.info('Updating Comment Status', { id, status });
    return this.http.post<any>(`${this.commentsUrl}/${id}`, { status: status })
      .pipe(catchError(this.handleError.bind(this)));
  }
  // Delete a post
  deleteComment(id: string): Observable<any> {
    this.logger.info('Deleting Comment', { id });
    return this.http.delete<any>(`${this.commentsUrl}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Users Call

  getUsers(page: number = 1, limit: number = 10): Observable<any> {
    this.logger.info('Fetching comments with pagination', { page, limit });
    return this.http.get<any>(`${this.usersUrl}?page=${page}&limit=${limit}`)
      .pipe(catchError(this.handleError.bind(this)));
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

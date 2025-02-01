// logger.service.ts
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ToastifyService } from './toastify.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private toastify: ToastifyService
  ) { }
  private utilityApiUrl = environment.baseUrl + environment.endpoints.logger;

  log(message: string, ...args: any[]): void {
    this.logger.log(message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.logger.info(message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.logger.debug(message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.logger.warn(message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.logger.error(message, ...args);
  }

  fatal(message: string, ...args: any[]): void {
    this.logger.fatal(message, ...args);
  }


  // Methods to fetch logs
  fetchAdminLogs(): Observable<any> {
    return this.http.get<any>(this.utilityApiUrl + "/adminLogs");
  }

  fetchClientLogs(): Observable<any> {
    return this.http.get<any>(this.utilityApiUrl + "/clientLogs");
  }
}

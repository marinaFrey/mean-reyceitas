import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { AUTH_TOKEN_KEY } from '@constants/cookies.constant';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const API_KEY = localStorage.getItem(AUTH_TOKEN_KEY) ?? ''; 
    const authReq = httpRequest.clone({
      headers: httpRequest.headers.set('Authorization', `Bearer ${API_KEY}`)
    });
    return next.handle(authReq).pipe(
      catchError((error) => this.handleErrors(error))
    );
  }

  private handleErrors(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
        console.log('This is client side error');
        errorMsg = `Error: ${error.error.message}`;
    } else {
        console.log('This is server side error');
        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    }
    console.log(errorMsg);
    return throwError(() => error);
  }
}
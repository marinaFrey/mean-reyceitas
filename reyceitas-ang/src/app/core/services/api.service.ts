import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  get<T>(request: string): Observable<T> {
    return this.http.get<T>(environment.apiUrl + request);
  }

  post<T>(request: string, payload: any): Observable<any> {
    return this.http.post(environment.apiUrl + request, payload);
  }

  put<T>(request: string, payload: any): Observable<any> {
    return this.http.put(environment.apiUrl + request, payload);
  }

  delete<T>(request: string): Observable<any> {
    return this.http.delete(environment.apiUrl + request);
  }
}
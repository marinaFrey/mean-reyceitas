import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient, private api: ApiService) { }

  public upload(image: File): Observable<Response> {
    const formData = new FormData();
    formData.append('image', image);
    return this.api.post('/img/upload-single', formData);
  }
  /*
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    
    const req = new HttpRequest('POST', `${environment.apiUrl}/upload`, formData, {
        reportProgress: true,
        responseType: 'json'
      });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.api.get(`/files`);
  }*/
}
import { Injectable } from '@angular/core';
import { Alert, AlertType } from '@models/alert.model';
import { Observable, Subject } from 'rxjs';
 
@Injectable()
export class AlertService {
    alertEvents: Observable<Alert>;
    private _alertEvents = new Subject<Alert>();
  
    constructor() {
      this.alertEvents = this._alertEvents.asObservable();
    }
  
    success(message: string, action?: string) {
        this.showAlert(AlertType.Success, message, action);
    }

    error(message: string, action?: string) {
        this.showAlert(AlertType.Error, message, action);
    }
    
    private showAlert(type: AlertType, message: string, action: string = 'Ok') {
        this._alertEvents.next({
            message,
            action,
            type: type,
          });
    }
}
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Alert } from '@models/alert.model';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-alert',
  template: '',
  styleUrls: [],
  providers: [MatSnackBar]
})
export class AlertComponent implements OnInit {
  readonly HORIZONTAL_POSITION: MatSnackBarHorizontalPosition = 'center';
  readonly VERTICAL_POSITION: MatSnackBarVerticalPosition = 'top';
  readonly DURATION = 4;

  constructor(private alertService: AlertService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.subscribeToToasts();
  }

  private subscribeToToasts() {
    this.alertService.alertEvents.subscribe((alert) => {
      this.openSnackBar(alert)
    });
  }

  openSnackBar(alert: Alert) {
    this._snackBar.open(alert.message, alert.action, {
      horizontalPosition: this.HORIZONTAL_POSITION,
      verticalPosition: this.VERTICAL_POSITION,
      duration: this.DURATION * 1000,
      panelClass: `alert-${alert.type}`
    });
  }

}

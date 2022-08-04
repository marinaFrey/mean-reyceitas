import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { HOME_ROUTE } from '../constants/routes.constant';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService : AuthService, private route : Router) { }

  canActivate(){
    if(this.authService.isAuthenticated()) {
      return true;
    }
    this.route.navigate([HOME_ROUTE]);
    return false;
  }
}	

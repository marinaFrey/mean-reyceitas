import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { HOME_ROUTE } from '../constants/routes.constant';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService, private router : Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean  {
    return this.authService.isLoggedIn().pipe(
      map((e) => {
        if (e) {
            return true;
        } else {
            this.router.navigate([HOME_ROUTE]);
            return false;
        }
    }))
  }
}
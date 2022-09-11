import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { AUTH_TOKEN_KEY } from '@constants/cookies.constant';
import { AUTH_ENDPOINT, VALIDATE_TOKEN_ENDPOINT } from '@constants/endpoints.constant';
import { User } from '@models/user/user.model';
import { BehaviorSubject, lastValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {
  userSubject = new BehaviorSubject<User | null>(null);
  isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private api: ApiService, 
              private socialAuthService: SocialAuthService) { }

  public isLoggedIn(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  public getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  public setUserAuthentication(token: string) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  public login(token:string): Observable<User> {
    return this.api.post(AUTH_ENDPOINT+'/login', {'token': token});
  }

  public checkTokenValidation(): Observable<void> {
    return this.api.get(AUTH_ENDPOINT+VALIDATE_TOKEN_ENDPOINT)
      .pipe(map((user) => {
        this.userSubject.next(user as User)
      }));
  }

  public getUserInfo(): Observable<any> {
    return this.socialAuthService.authState.pipe(
      switchMap(socialUser => {
        if(socialUser)
          return this.login(socialUser.idToken)
        else
          return of(null)
      }),
      map(user => {
        if(user)
          this.setUserAuthentication(user?.token)
        this.userSubject.next(user);
        this.isAuthenticatedSubject.next(user ? true : false);
        return user;
      })
    );
  }

  public socialLogin(): Promise<any> {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.setUserAuthentication(user.authToken);
        return lastValueFrom(this.api.get('/auth/login'));
      })
  }

  public signOut(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.socialAuthService.signOut();
  }

  public refreshToken(): Promise<void> {
    return this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  private isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_TOKEN_KEY) != "" ? true : false
  }
}
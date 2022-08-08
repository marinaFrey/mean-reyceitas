import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { AUTH_TOKEN_KEY } from '@constants/cookies.constant';
import { User } from '@models/user.model';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, lastValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {
  userSubject = new BehaviorSubject<User | null>(null);
  isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private api: ApiService, 
              private socialAuthService: SocialAuthService,
              private cookieService: CookieService) { }

  public isLoggedIn(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  public getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  public setUserAuthentication(token: string) {
    this.cookieService.put(AUTH_TOKEN_KEY, token);
  }

  public login(token:string): Observable<User> {
    return this.api.post('/login', {'token': token});
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
        console.log(user)
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
        return lastValueFrom(this.api.get('/login'));
      })
  }

  public signOut(): void {
    this.cookieService.remove(AUTH_TOKEN_KEY);
    this.socialAuthService.signOut();
  }

  public refreshToken(): Promise<void> {
    return this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  private isAuthenticated(): boolean {
    return this.cookieService.hasKey(AUTH_TOKEN_KEY)
  }
}
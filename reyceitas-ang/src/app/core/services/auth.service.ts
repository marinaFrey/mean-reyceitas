import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { AUTH_TOKEN_KEY } from '@constants/cookies.constant';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, lastValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {
  isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private api: ApiService, 
              private socialAuthService: SocialAuthService,
              private cookieService: CookieService) { }

  public isLoggedIn() : Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  public setUserAuthentication(token: string) {
    this.cookieService.put(AUTH_TOKEN_KEY, token);
  }

  public login(token:string): Observable<{token: string}> {
    return this.api.post('/login', {'token': token});
  }

  public getUserInfo(): Observable<any> {
    return this.socialAuthService.authState.pipe(
      switchMap(user => {
        if(user)
          return this.login(user.idToken)
        else
          return of(null)
      }),
      map(auth => {
        console.log(auth)
        if(auth)
          this.setUserAuthentication(auth?.token)

        this.isAuthenticatedSubject.next(auth ? true : false);
        
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
    return this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then(()=>console.log('in'));
  }

  private isAuthenticated(): boolean {
    return this.cookieService.hasKey(AUTH_TOKEN_KEY)
  }
}
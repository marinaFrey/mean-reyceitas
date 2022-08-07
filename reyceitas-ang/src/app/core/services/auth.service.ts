import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { AUTH_TOKEN_KEY } from '@constants/cookies.constant';
import { lastValueFrom, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {

  constructor(private api: ApiService, private socialAuthService: SocialAuthService) { }

  public isAuthenticated() : Boolean {
    let token = localStorage.getItem(AUTH_TOKEN_KEY)
    if(token && JSON.parse(token)){
      return true;
    }
    return false;
  }

  public setUserAuthentication(token: string) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  public login(email: string, password: string) {
    return this.api.post('/api/authenticate', {'username' : email, 'password' : password});
  }

  public getUserInfo(): Observable<SocialUser> {
    return this.socialAuthService.authState;
  }

  public socialLogin(): Promise<any> {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.setUserAuthentication(user.authToken);
        return lastValueFrom(this.api.get('/login'));
      })
  }

  public signOut(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.socialAuthService.signOut();
  }

  public refreshToken(): Promise<void> {
    return this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then(()=>console.log('in'));
  }
}
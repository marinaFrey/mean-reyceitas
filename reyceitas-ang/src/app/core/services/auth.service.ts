import { Injectable } from '@angular/core';
import { AUTH_TOKEN_KEY } from '@constants/cookies.constant';
import { User } from '@models/user.model';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {

  constructor(private api: ApiService) { }

  public isAuthenticated() : Boolean {
    let token = localStorage.getItem(AUTH_TOKEN_KEY)
    if(token && JSON.parse(token)){
      return true;
    }
    return false;
  }

  public setUserAuthentication(user: User){
    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(user));
  }

  public login(email: string, password: string) {
    return this.api.post('/api/authenticate', {'username' : email, 'password' : password});
  }
}
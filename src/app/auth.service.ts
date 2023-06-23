import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private router: Router) { }

  get isLoggedIn() {
    return this.getToken()
  };
  
  redirectIfNotAuthenticated() {
    if(!this.isLoggedIn){
      this.router.navigateByUrl(environment.loginPagePath)
    }
  }

  setToken(token: string) {
    sessionStorage.setItem(environment.sessionStorageTokenName, token);
  }
  
  getToken(): string | null {
    return sessionStorage.getItem(environment.sessionStorageTokenName)
  }
 
}

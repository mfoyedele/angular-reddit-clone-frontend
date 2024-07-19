import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
// import { User } from '@app/_models';
import { SignupRequestPayload } from '@app/_models';
import { LoginRequestPayload } from '@app/_models';
import { LoginResponse } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }
  
    private userSubject: BehaviorSubject<LoginResponse | null>;
    public user: Observable<LoginResponse | null>;

    constructor(
        private router: Router,
        private httpClient: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    register(signupRequestPayload: SignupRequestPayload): Observable<any> {
        return this.httpClient.post(`${environment.apiUrl}/api/auth/signup`,  signupRequestPayload, { responseType: 'text' });
    }

    login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
        return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, loginRequestPayload )
            .pipe(map(data => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('authenticationToken', data.authenticationToken);
                localStorage.setItem('username', data.username);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('expiresAt', data.expiresAt.toString());
        
                this.loggedIn.emit(true);
                this.username.emit(data.username);
                return true;
            }));
    }

    getJwtToken() {
        return localStorage.getItem('authenticationToken');
      }
    
      refreshToken() {
        return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/api/auth/refresh/token`,
          this.refreshTokenPayload)
          .pipe(tap(response => {
            localStorage.removeItem('authenticationToken');
            localStorage.removeItem('expiresAt');
    
            localStorage.setItem('authenticationToken',
              response.authenticationToken);
            localStorage.setItem('expiresAt', response.expiresAt.toString());
          }));
      }
    
      logout() {
        this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
          { responseType: 'text' })
          .subscribe(data => {
            console.log(data);
          }, error => {
            throwError(error);
          })
        localStorage.removeItem('authenticationToken');
        localStorage.removeItem('username');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiresAt');
      }
    
      getUserName() {
        return localStorage.getItem('username');
      }
      getRefreshToken() {
        return localStorage.getItem('refreshToken');
      }
    
      isLoggedIn(): boolean {
        return this.getJwtToken() != null;
      }

}
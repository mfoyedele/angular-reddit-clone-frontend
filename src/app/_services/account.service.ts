import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { SignupRequestPayload } from '@app/_models';
import { LoginRequestPayload } from '@app/_models';
import { LoginResponse } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  
    // private userSubject: BehaviorSubject<User | null>;
    // public user: Observable<User | null>;

    constructor(private http: HttpClient,
        private localStorage: LocalStorageService) {
      }
    // constructor(
    //     private router: Router,
    //     private http: HttpClient
    // ) {
    //     this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    //     this.user = this.userSubject.asObservable();
    // }

    // public get userValue() {
    //     return this.userSubject.value;
    // }

    register(signupRequestPayload: SignupRequestPayload): Observable<any>{
        return this.http.post(`${environment.apiUrl}/api/auth/signup`, signupRequestPayload, { responseType: 'text' });
    }

    login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
        return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, loginRequestPayload)
            .pipe(map(data => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.localStorage.store('authenticationToken', data.authenticationToken);
                this.localStorage.store('username', data.username);
                this.localStorage.store('refreshToken', data.refreshToken);
                this.localStorage.store('expiresAt', data.expiresAt);

                this.loggedIn.emit(true);
                this.username.emit(data.username);
                return true;
            }));
    }

    getJwtToken() {
        return localStorage.retrieve('authenticationToken');
      }

    // logout() {
    //     // remove user from local storage and set current user to null
    //     localStorage.removeItem('user');
    //     this.userSubject.next(null);
    //     this.router.navigate(['/account/login']);
    // }    

    isLoggedIn(): boolean {
        return this.getJwtToken() != null;
      }

}
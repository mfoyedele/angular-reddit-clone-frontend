import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
// import { User } from '@app/_models';
import { SignupRequestPayload } from '@app/_models';
import { LoginRequestPayload } from '@app/_models';
import { LoginResponse } from '@app/_models';
import { EventBusService } from '@app/_shared/event-bus.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<LoginResponse | null>;
    public user: Observable<LoginResponse | null>;

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  eventBusSub?: Subscription;
  
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }
     

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private eventBusService: EventBusService
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    ngOnInit(): void {      
  
      this.eventBusSub = this.eventBusService.on('logout', () => {
        this.logout();
      });
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

    getJwtToken():any {
        return localStorage.getItem('authenticationToken');
      }
    
      refreshToken() {
        return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/api/auth/refresh/token`,
          this.refreshTokenPayload + 'refreshtoken', httpOptions)
          .pipe(tap(response => {
            localStorage.removeItem('authenticationToken');
            localStorage.removeItem('expiresAt');
    
            localStorage.setItem('authenticationToken',
              response.authenticationToken);
            localStorage.setItem('expiresAt', response.expiresAt.toString());
          }));
      }
    
      logout() {
        this.httpClient.post(`${environment.apiUrl}/api/auth/logout`, this.refreshTokenPayload,
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
        return localStorage.getItem('username')!;
      }
      getRefreshToken() {
        return localStorage.getItem('refreshToken');
      }
    
      isLoggedIn(): boolean {
        return this.getJwtToken() != null;
      }

}
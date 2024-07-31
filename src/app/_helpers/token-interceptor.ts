// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { Observable, BehaviorSubject, throwError } from 'rxjs';
// import { AccountService } from '@app/_services';
// import { catchError, switchMap, take, filter } from 'rxjs/operators';
// import { LoginResponse } from '@app/_models';
// import { environment } from '@environments/environment';

// @Injectable({
//     providedIn: 'root'
// })
// export class TokenInterceptor implements HttpInterceptor {

//     private isTokenRefreshing = false;
//     private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

//     constructor(private accountService: AccountService) { }

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const user = this.accountService.userValue;
//         const isLoggedIn = user?.authenticationToken;
//         const isApiUrl = req.url.startsWith(environment.apiUrl);

//         if (isLoggedIn && isApiUrl) {
//             req = this.addToken(req, user.authenticationToken);
//         }

//         return next.handle(req).pipe(
//             catchError(error => {
//                 if (error instanceof HttpErrorResponse && error.status === 403) {
//                     return this.handleAuthErrors(req, next);
//                 } else {
//                     return throwError(() => error);
//                 }
//             })
//         );
//     }

//     private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         if (!this.isTokenRefreshing) {
//             this.isTokenRefreshing = true;
//             this.refreshTokenSubject.next(null);

//             return this.accountService.refreshToken().pipe(
//                 switchMap((refreshTokenResponse: LoginResponse) => {
//                     this.isTokenRefreshing = false;
//                     this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
//                     return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
//                 })
//             );
//         } else {
//             return this.refreshTokenSubject.pipe(
//                 filter(result => result !== null),
//                 take(1),
//                 switchMap(() => {
//                     return next.handle(this.addToken(req, this.accountService.getJwtToken()));
//                 })
//             );
//         }
//     }

//     private addToken(req: HttpRequest<any>, jwtToken: string): HttpRequest<any> {
//         return req.clone({
//             setHeaders: { Authorization: `Bearer ${jwtToken}` }
//         });
//     }
//  }






import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
// import { AuthService } from './auth/shared/auth.service';
import { AccountService } from '@app/_services';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
// import { LoginResponse } from './auth/login/login-response.payload'
import { LoginResponse } from '@app/_models';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AccountService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }
        const jwtToken = this.authService.getJwtToken();
        if (jwtToken) {
            this.addToken(req, jwtToken);
        }

        if (jwtToken) {
            return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse
                    && error.status === 403) {
                    return this.handleAuthErrors(req, next);
                } else {
                    return throwError(() => error);
                }
            }));
        }
        return next.handle(req);

    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject
                        .next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req,
                        refreshTokenResponse.authenticationToken));
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req,
                        this.authService.getJwtToken()))
                })
            );
        }
    }

    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: req.headers.set('Authorization',
                'Bearer ' + jwtToken)
        });
    }

}
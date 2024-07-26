import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

import { environment } from '@environments/environment';
import { AccountService } from '@app/_services';

export function jwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    // add auth header with jwt if user is logged in and request is to the api url
    const accountService = inject(AccountService);
    const user = accountService.userValue;
    const isLoggedIn = user?.authenticationToken;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${user.authenticationToken}` }
        });
    }

    return next(request);
}




// import { inject, Injectable } from '@angular/core';
// import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptor, HttpHandler, HttpErrorResponse } from '@angular/common/http';
// import { Observable, BehaviorSubject, throwError } from 'rxjs';
// import { catchError, switchMap, take, filter } from 'rxjs/operators';

// import { environment } from '@environments/environment';
// import { AccountService } from '@app/_services';
// import { LoginResponse } from '@app/_models';

// // Helper function to add JWT token to headers
// function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
//     return request.clone({
//         setHeaders: { Authorization: `Bearer ${token}` }
//     });
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class JwtInterceptor implements HttpInterceptor {

//     private isTokenRefreshing = false;
//     private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

//     constructor(private accountService: AccountService) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const user = this.accountService.userValue;
//         const isLoggedIn = user?.authenticationToken;
//         const isApiUrl = request.url.startsWith(environment.apiUrl);

//         if (isLoggedIn && isApiUrl) {
//             request = addToken(request, user.authenticationToken);
//         }

//         return next.handle(request).pipe(
//             catchError(error => {
//                 if (error instanceof HttpErrorResponse && error.status === 403) {
//                     return this.handleAuthErrors(request, next);
//                 } else {
//                     return throwError(error);
//                 }
//             })
//         );
//     }

//     private handleAuthErrors(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         if (!this.isTokenRefreshing) {
//             this.isTokenRefreshing = true;
//             this.refreshTokenSubject.next(null);

//             return this.accountService.refreshToken().pipe(
//                 switchMap((refreshTokenResponse: LoginResponse) => {
//                     this.isTokenRefreshing = false;
//                     this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
//                     return next.handle(addToken(request, refreshTokenResponse.authenticationToken));
//                 })
//             );
//         } else {
//             return this.refreshTokenSubject.pipe(
//                 filter(result => result !== null),
//                 take(1),
//                 switchMap(() => {
//                     const newToken: any = this.accountService.getJwtToken();
//                     return next.handle(addToken(request, newToken));
//                 })
//             );
//         }
//     }
// }

import { inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, GuardResult, MaybeAsync, UrlTree } from '@angular/router';

import { AccountService } from '@app/_services';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
// export function authGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
export class authGuard implements CanActivate {   
    constructor(private authService: AccountService, private router: Router) { }
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
        const isAuthenticated = this.authService.isLoggedIn();
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        }
        return true;
      }
}
import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

import { AccountService } from '@app/_services';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [NgClass, NgIf, RouterLink]
  })

  export class HeaderComponent implements OnInit {
    faUser = faUser;
    isLoggedIn!: boolean;
    username!: string;

    constructor(private authService: AccountService, private router: Router) { }

    ngOnInit(): void {
        this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
        this.authService.username.subscribe((data: string) => this.username = data);
        this.isLoggedIn = this.authService.isLoggedIn();
        this.username = this.authService.getUserName();
    }

    goToUserProfile() {
        this.router.navigateByUrl('/user-profile/' + this.username);
      }
    
      logout() {
        this.authService.logout();
        this.isLoggedIn = false;
        this.router.navigateByUrl('/account/login');
      }
}
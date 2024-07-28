import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AlertComponent } from './_components/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './_services';
import { LoginResponse } from './_models';

@Component({
    selector: 'app-root', templateUrl: 'app.component.html',
    standalone: true,
    imports: [NgIf, RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule, CommonModule, AlertComponent]
})
export class AppComponent {
    title = 'angular-reddit-clone';

    user?: LoginResponse | null;


    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }
}
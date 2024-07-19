import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AccountService } from './_services';
import { LoginResponse } from './_models';
import { AlertComponent } from './_components/alert.component';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-root', templateUrl: 'app.component.html',
    standalone: true,
    imports: [NgIf, RouterOutlet, RouterLink, RouterLinkActive, AlertComponent, HeaderComponent]
})
export class AppComponent {
    title = 'angular-reddit-clone';
}
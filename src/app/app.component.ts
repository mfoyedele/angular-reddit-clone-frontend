import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AccountService } from './_services';
import { LoginResponse } from './_models';
import { AlertComponent } from './_components/alert.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root', templateUrl: 'app.component.html',
    standalone: true,
    imports: [NgIf, RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule, CommonModule, AlertComponent]
})
export class AppComponent {
    title = 'angular-reddit-clone';
}
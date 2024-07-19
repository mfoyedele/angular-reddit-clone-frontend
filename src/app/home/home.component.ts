import { Component } from '@angular/core';

import { LoginResponse } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
    templateUrl: 'home.component.html',
    standalone: true
})
export class HomeComponent {
    user: LoginResponse | null;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}
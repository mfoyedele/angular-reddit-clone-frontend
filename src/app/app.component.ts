import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-root', templateUrl: 'app.component.html',
    standalone: true,
    imports: [NgIf, RouterOutlet, RouterLink, RouterLinkActive]
})

export class AppComponent { }
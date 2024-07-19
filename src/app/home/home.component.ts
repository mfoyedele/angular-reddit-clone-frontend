import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { LoginResponse } from '@app/_models';
import { AccountService } from '@app/_services';
import { HeaderComponent } from '@app/header/header.component';

@Component({
    templateUrl: 'home.component.html',
    standalone: true,    
    imports: [NgClass, NgIf, HeaderComponent]
})
export class HomeComponent {

  
    constructor() {
      
    }
  
    ngOnInit(): void {
    }
  
  }
  
import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { HeaderComponent } from '@app/header/header.component';

@Component({
    templateUrl: 'home.component.html', styleUrls: ['home.component.css'],
    standalone: true,    
    imports: [NgClass, NgIf, HeaderComponent]
})
export class HomeComponent {

  
    constructor() {
      
    }
  
    ngOnInit(): void {
    }
  
  }
  
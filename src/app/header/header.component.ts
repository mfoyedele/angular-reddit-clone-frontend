import { Component } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',  
  styleUrl: './header.component.css',
  standalone: true,
  imports: [NgIf, NgClass]
})
export class HeaderComponent {

}

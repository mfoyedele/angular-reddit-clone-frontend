import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { SubredditModel } from '../subreddit-response';
import { Router, RouterLink } from '@angular/router';
import { SubredditService } from '../subreddit.service';
import { first, throwError } from 'rxjs';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css'],
  standalone: true,
  imports: [NgClass, NgIf, RouterLink, CommonModule, ReactiveFormsModule]
})
export class CreateSubredditComponent implements OnInit {
  createSubredditForm!: FormGroup;
  subredditModel: SubredditModel;
  submitted = false;
  name = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private subredditService: SubredditService) {
    
    this.subredditModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit() {
    this.createSubredditForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  // convenience getter for easy access to form fields
  get f() { return this.createSubredditForm.controls; }


  createSubreddit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createSubredditForm.invalid) {
        return;
    }

   
    this.subredditService.createSubreddit(this.createSubredditForm.value)
    .subscribe({
        next: data => {
          console.log(data)            
        this.router.navigateByUrl('/list-subreddits');
           
    }, 
    error:error => {
      return throwError(() => error);
    }
    });
  }
}

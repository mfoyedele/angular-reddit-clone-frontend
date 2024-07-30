import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { PostService } from 'src/app/shared/post.service';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { first, throwError } from 'rxjs';
import { CreatePostPayload } from './create-post.payload';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  standalone: true,
  imports: [NgClass, NgIf, RouterLink, CommonModule, ReactiveFormsModule, EditorModule]
})
export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;
  postPayload: CreatePostPayload;
  submitted = false;
  subreddits!: Array<SubredditModel>;

  constructor(private router: Router, private postService: PostService,
    private subredditService: SubredditService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });
  }

   // convenience getter for easy access to form fields
   get f() { return this.createPostForm.controls; }

  createPost() {
    this.submitted = true;

     // stop here if form is invalid
     if (this.createPostForm.invalid) {
        return;
    }
    
    this.postService.createPost(this.createPostForm.value)
    .pipe(first())
    .subscribe({
        next: () => {
            this.router.navigateByUrl('/');
        },
    error: error => {
      return throwError(() => error);
    }
  });
  }
  
  discardPost() {
    this.router.navigateByUrl('/');
  }
}
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { first, throwError } from 'rxjs';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";
import { SubredditSideBarComponent } from "../../shared/subreddit-side-bar/subreddit-side-bar.component";
import { VoteButtonComponent } from "../../shared/vote-button/vote-button.component";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
  standalone: true,
  imports: [NgClass, NgIf, RouterLink, CommonModule, ReactiveFormsModule, SideBarComponent, SubredditSideBarComponent, VoteButtonComponent]
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post!: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  submitted = false;
  comments!: CommentPayload[];

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

   // convenience getter for easy access to form fields
   get f() { return this.commentForm.controls; }

  postComment() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.commentForm.invalid) {
        return;
    }

    this.commentService.postComment(this.commentForm.value)
    .pipe(first())
    .subscribe({
        next: () => {
      this.commentForm.value.setValue('');
      this.getCommentsForPost();
        },
     error:error => {
      throwError(error);
     }
    });
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }

}

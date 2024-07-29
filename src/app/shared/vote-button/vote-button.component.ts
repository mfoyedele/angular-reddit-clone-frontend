import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';
import { VoteService } from '../vote.service';
import { AccountService } from '@app/_services';
import { PostService } from '../post.service';
import { first, throwError } from 'rxjs';
import { AlertService } from '@app/_services';
import { CommonModule, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css'],
  standalone: true,    
  imports: [NgClass, NgIf, CommonModule, FontAwesomeModule]
})
export class VoteButtonComponent implements OnInit {

  @Input() post!: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor!: string;
  downvoteColor!: string;
  isLoggedIn!: boolean;

  constructor(private voteService: VoteService,
    private authService: AccountService,
    private postService: PostService, private toastr: AlertService) {
      
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    }
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload)
    .subscribe({
      next: data => {
        this.updateVoteDetails();
        console.log(data)
    }, error:error => {
      // this.toastr.error("Failed vote");      
      return throwError(() => error);
    }
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }
}

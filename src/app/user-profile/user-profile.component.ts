import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { PostTileComponent } from "../shared/post-tile/post-tile.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',  
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [NgClass, NgIf, CommonModule, RouterLink, PostTileComponent]

})
export class UserProfileComponent implements OnInit {
  name: string;
  posts!: PostModel[];
  comments!: CommentPayload[];
  postLength!: number;
  commentLength!: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService) {
    this.name = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  ngOnInit(): void {
  }

}

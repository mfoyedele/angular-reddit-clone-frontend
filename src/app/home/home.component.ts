import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '@app/header/header.component';
import { PostModel } from '@app/shared/post-model';
import { PostService } from '@app/shared/post.service';
import { PostTileComponent } from '@app/shared/post-tile/post-tile.component';

@Component({
    templateUrl: 'home.component.html', styleUrls: ['home.component.css'],
    standalone: true,    
    imports: [NgClass, NgIf, HeaderComponent, PostTileComponent]
})
export class HomeComponent implements OnInit{

    posts: Array<PostModel> = [];

  
    constructor(private postService: PostService) {
        this.postService.getAllPosts().subscribe(post => {
            this.posts = post;
          });      
    }
  
    ngOnInit(): void {
    }
  
  }
  
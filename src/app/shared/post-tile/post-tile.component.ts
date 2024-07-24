import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { PostService } from '../post.service';
import { PostModel } from '../post-model';
import { VoteButtonComponent } from '../vote-button';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  standalone: true,
  imports: [NgClass, NgIf, CommonModule, RouterLink, FontAwesomeModule, VoteButtonComponent],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {

  faComments = faComments;
  @Input() posts!: PostModel[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPost(id: number | undefined): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}

import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { PostService } from '../post.service';
import { PostModel } from '../post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  standalone: true,
  imports: [NgClass, NgIf, CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {

  faComments = faComments;
  @Input() posts!: PostModel[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}

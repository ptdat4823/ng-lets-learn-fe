import { Component } from '@angular/core';
import { mockComments } from '@shared/mocks/comment';
import { Comment } from '@shared/models/comment';

@Component({
  selector: 'comment-list',
  standalone: false,
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
})
export class CommentListComponent {
  comments: Comment[] = mockComments;
}

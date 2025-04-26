import { Component, Input } from '@angular/core';
import { Comment } from '@shared/models/comment';
import { format } from 'date-fns';

@Component({
  selector: 'comment',
  standalone: false,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input({ required: true }) comment!: Comment;

  formatMessageTime(date: string | null): string {
    if (!date) return '';
    try {
      return format(new Date(date), 'MM/dd/yyyy HH:mm a');
    } catch (error) {
      return '';
    }
  }
}

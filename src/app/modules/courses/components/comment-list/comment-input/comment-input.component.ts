import { Component } from '@angular/core';

@Component({
  selector: 'comment-input',
  standalone: false,
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.scss',
})
export class CommentInputComponent {
  newComment = '';

  submitComment(): void {
    console.log('Comment submitted:', this.newComment);
  }
}

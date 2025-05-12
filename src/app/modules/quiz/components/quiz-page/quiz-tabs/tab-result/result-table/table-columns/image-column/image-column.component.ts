import { Component, Input } from '@angular/core';

@Component({
  selector: 'image-column',
  standalone: false,
  templateUrl: './image-column.component.html',
  styleUrl: './image-column.component.scss',
})
export class ImageColumnComponent {
  @Input() imageUrl: string = '';
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'circle-image',
  standalone: true,
  templateUrl: './circle-image.component.html',
  styleUrl: './circle-image.component.scss',
})
export class CircleImageComponent {
  @Input() src: string | null = null;
  @Input() defaultImage: string = 'image';
}

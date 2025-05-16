import { Component, Input } from '@angular/core';

type Color = 'blue' | 'orange';

@Component({
  selector: 'detail-section',
  standalone: false,
  templateUrl: './detail-section.component.html',
  styleUrl: './detail-section.component.scss',
})
export class DetailSectionComponent {
  @Input({ required: true }) title!: string;
  @Input() titleColor: Color = 'blue';
}

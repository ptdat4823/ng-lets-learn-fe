import { Component, Input } from '@angular/core';

export type ColorItemType =
  | 'green'
  | 'cyan'
  | 'blue'
  | 'yellow'
  | 'gray'
  | 'purple';

@Component({
  selector: 'color-item',
  standalone: false,
  templateUrl: './color-item.component.html',
  styleUrl: './color-item.component.scss',
})
export class ColorItemComponent {
  @Input() color: ColorItemType = 'purple';
}

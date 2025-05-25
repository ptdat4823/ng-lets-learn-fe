import { Component, Input } from '@angular/core';

export type Rank = 'S' | 'A' | 'B' | 'C';

@Component({
  selector: 'rank-logo',
  standalone: false,
  templateUrl: './rank-logo.component.html',
  styleUrls: ['./rank-logo.component.scss'],
})
export class RankLogoComponent {
  @Input() rank: Rank = 'S';
}

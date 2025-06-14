import { Component, Input, OnInit } from '@angular/core';
import { Rank } from '../rank-logo/rank-logo.component';
import { User } from '@shared/models/user';
import { ColorItemType } from '../color-item/color-item.component';
import { mockUsers } from '@shared/mocks/user';

@Component({
  selector: 'rank-item',
  standalone: false,
  templateUrl: './rank-item.component.html',
  styleUrl: './rank-item.component.scss',
})
export class RankItemComponent implements OnInit {
  @Input() rank: Rank = 'S';
  @Input() students: User[] = [...mockUsers, ...mockUsers, ...mockUsers];

  rangeMap: Record<Rank, string> = {
    S: '80 - 100%',
    A: '50 - 79%',
    B: '20 - 49%',
    C: '0 - 19%',
  };
  rangeColorMap: Record<Rank, ColorItemType> = {
    S: 'green',
    A: 'cyan',
    B: 'blue',
    C: 'yellow',
  };

  ngOnInit(): void {}

  getFirst4Students(): User[] {
    return this.students.slice(0, 4);
  }
}

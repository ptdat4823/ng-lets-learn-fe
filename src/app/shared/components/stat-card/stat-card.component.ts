import { Component, Input, OnInit } from '@angular/core';
import { DashboardStat } from '@shared/models/dashboard-stats';

@Component({
  selector: 'stat-card',
  standalone: false,
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent implements OnInit {
  @Input({ required: true }) stat!: DashboardStat;
  @Input() size!: 'small' | 'medium';
  increase: boolean = false;

  ngOnInit(): void {
    if (this.stat && typeof this.stat.increasement === 'string') {
      const match = this.stat.increasement.match(/^([+-]?\d+(\.\d+)?)/);
      if (match) {
        this.increase = parseFloat(match[1]) > 0;
      } else {
        this.increase = false;
      }
    } else {
      this.increase = false;
    }
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'setting-row',
  standalone: false,
  templateUrl: './setting-row.component.html',
  styleUrl: './setting-row.component.scss',
})
export class SettingRowComponent {
  @Input() label: string | null = null;
  @Input() for: string = '';
  @Input() align: 'center' | 'start' | 'end' = 'center';
}

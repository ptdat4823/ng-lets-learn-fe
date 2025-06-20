import { Component, Input } from '@angular/core';
import { ToDoItem } from '../../to-do.service';

@Component({
  selector: 'tab-overdue',
  standalone: false,
  templateUrl: './tab-overdue.component.html',
  styleUrl: './tab-overdue.component.scss'
})
export class TabOverdueComponent {
  @Input() items: ToDoItem[] = [];
}

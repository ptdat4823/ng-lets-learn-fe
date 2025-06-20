import { Component, Input } from '@angular/core';
import { ToDoItem } from '../../to-do.service';

@Component({
  selector: 'tab-done',
  standalone: false,
  templateUrl: './tab-done.component.html',
  styleUrl: './tab-done.component.scss'
})
export class TabDoneComponent {
  @Input() items: ToDoItem[] = [];
}

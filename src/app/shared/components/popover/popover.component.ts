import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popover',
  standalone: false,
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
})
export class PopoverComponent {
  @Input() isOpen = false;

  onTriggerClick() {
    this.isOpen = !this.isOpen;
  }
}

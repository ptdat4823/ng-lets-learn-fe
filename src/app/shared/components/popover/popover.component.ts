import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popover',
  standalone: false,
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
})
export class PopoverComponent {
  @Input() isOpen = false;
  @Output() openChange = new EventEmitter<boolean>();

  onTriggerClick() {
    this.openChange.emit(!this.isOpen);
    this.isOpen = !this.isOpen;
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

export type DropdownOption = {
  value: string;
  label: string;
};

@Component({
  selector: 'app-dropdown',
  standalone: false,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() options: DropdownOption[] = [];
  @ViewChild('triggerRef', { static: false }) triggerRef!: ElementRef;
  @Output() onSelect = new EventEmitter<DropdownOption>();
  dropdownPosition = { top: '', left: '', bottom: '', right: '' };
  isOpen = false;

  constructor(private _eref: ElementRef) {}

  selectOption(option: DropdownOption): void {
    this.onSelect.emit(option);
    this.isOpen = false;
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.dropdownPosition = this.getPositionOfDropdown();
  }

  getPositionOfDropdown() {
    const rect = this.triggerRef.nativeElement.getBoundingClientRect();
    const dropdownHeight = 200; // should match your max dropdown height
    const dropdownWidth = 150; // should match your max dropdown width
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceLeft = rect.left;
    const spaceRight = window.innerWidth - rect.right;
    let top = 'auto';
    let bottom = 'auto';

    if (spaceBelow < dropdownHeight) {
      bottom = `${window.innerHeight - rect.top + 4}px`; // 4px for the gap
    } else {
      top = `${rect.bottom + 4}px`; // 4px for the gap
    }

    if (spaceLeft > dropdownWidth && spaceRight < dropdownWidth) {
      return {
        top,
        bottom,
        left: `auto`,
        right: `${window.innerWidth - rect.right}px`,
      };
    } else {
      return {
        top,
        bottom,
        left: `${rect.left}px`,
        right: `auto`,
      };
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.isOpen = false; // close dropdown
    }
  }
}

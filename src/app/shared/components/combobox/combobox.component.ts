import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComboboxService } from './combobox.service';
import { ComboboxOption } from './combobox.type';

@Component({
  selector: 'app-combobox',
  standalone: false,
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
})
export class ComboboxComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() controlName: string = '';
  @Input() validationMessages: Record<string, string> | null = null;

  @Input() options: ComboboxOption[] = [];
  @Input() placeholder = 'Select an option';
  @Output() onSelect = new EventEmitter<ComboboxOption>();
  @ViewChild('comboboxRef', { static: false }) comboboxRef!: ElementRef;

  comboboxService = inject(ComboboxService);

  isOpen = false;
  selectedOption: ComboboxOption | null = null;
  dropdownPosition = { top: '', left: '', bottom: '', right: '' };

  findOptionByValue(value: string): ComboboxOption | null {
    if (!value) return null;
    return this.options.find((option) => option.value === value) || null;
  }

  ngOnInit(): void {
    const initValue = this.form.get(this.controlName)?.value;
    if (initValue) {
      const initOption = this.findOptionByValue(initValue);
      this.comboboxService.selectOption(initOption);
    }

    this.comboboxService.selectedOption$.subscribe((option) => {
      this.selectedOption = option;
    });

    this.comboboxService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  toggleDropdown(): void {
    if (this.getDisabledState()) return;
    this.dropdownPosition = this.getPositionOfDropdown();
    this.comboboxService.toggleDropdown();
  }

  selectOption(option: ComboboxOption): void {
    this.comboboxService.selectOption(option);
    this.onSelect.emit(option);
    this.form?.get(this.controlName)?.setValue(option.value);
  }

  getPositionOfDropdown() {
    const rect = this.comboboxRef.nativeElement.getBoundingClientRect();
    const dropdownHeight = 200; // should match your max dropdown height
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow < dropdownHeight) {
      return {
        top: 'auto',
        left: `${rect.left}px`,
        bottom: `${window.innerHeight - rect.top + 4}px`, // 4px for the gap
        right: `${window.innerWidth - rect.right}px`,
      };
    } else {
      return {
        top: `${rect.bottom + 4}px`,
        left: `${rect.left}px`,
        bottom: `auto`,
        right: `${window.innerWidth - rect.right}px`,
      };
    }
  }

  getDropdownWidth() {
    if (!this.comboboxRef) return 0;
    const rect = this.comboboxRef.nativeElement.getBoundingClientRect();
    return rect.width;
  }

  getDisabledState(): boolean {
    const control = this.form.get(this.controlName);
    return control?.disabled || false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (
      this.comboboxRef &&
      !this.comboboxRef.nativeElement.contains(target) &&
      this.isOpen
    ) {
      this.comboboxService.toggleDropdown();
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

type Size = 'xs' | 'sm' | 'default';

@Component({
  selector: 'form-input',
  standalone: false,
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent {
  @Input() form: FormGroup = new FormGroup({ temp: new FormControl('') });
  @Input() controlName: string = 'temp';
  @Input() validationMessages: Record<string, string> | null = null;
  @Output() onChange = new EventEmitter<string>();

  // Input properties
  @Input() id = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() min: number | undefined = undefined;
  @Input() max: number | undefined = undefined;
  @Input() step: number | undefined = undefined;
  @Input() required = false;
  @Input() readonly = false;

  @Input() size: Size = 'default';

  // Internal state
  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getInputType(): string {
    if (this.type === 'password' && this.showPassword) {
      return 'text';
    }
    return this.type;
  }

  get isInvalid(): boolean {
    const control = this.form.get(this.controlName) as FormControl;
    return control?.invalid && (control?.dirty || control?.touched);
  }

  onValueChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.onChange.emit(value);
  }
}

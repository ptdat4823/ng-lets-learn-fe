import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

type Size = 'xs' | 'sm' | 'default';

@Component({
  selector: 'form-input',
  standalone: false,
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({
    temp: new FormControl('', { updateOn: 'change' }),
  });
  @Input() controlName: string = 'temp';
  @Input() validationMessages: Record<string, string> | null = null;
  @Output() onChange = new EventEmitter<string>();
  @Input() debounceTime = 0;

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

  ngOnInit(): void {
    const control = this.form.get(this.controlName) as FormControl;
    if (control) {
      control.valueChanges
        .pipe(debounceTime(this.debounceTime))
        .subscribe((value) => {
          this.onChange.emit(value);
        });
    }
  }

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
}

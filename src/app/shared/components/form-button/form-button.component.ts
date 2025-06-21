import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-button',
  standalone: false,
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() note?: string;
  @Input() buttonText?: string;
  @Input() buttonColor?: string;
  @Input() onClick?: () => void;
  @Input() disabled = false;
}

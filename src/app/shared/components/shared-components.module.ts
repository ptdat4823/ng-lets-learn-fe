import { NgModule } from '@angular/core';
import { FormInputComponent } from './form-input/form-input.component';
import { FormWarningComponent } from './form-warning/form-warning.component';
import { CardComponent } from './card/card.component';
@NgModule({
  imports: [FormWarningComponent, FormInputComponent, CardComponent],
  exports: [FormWarningComponent, FormInputComponent, CardComponent],
})
export class SharedComponentsModule {}

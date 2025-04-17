import { NgModule } from '@angular/core';
import { FormInputComponent } from './form-input/form-input.component';
import { FormWarningComponent } from './form-warning/form-warning.component';
@NgModule({
  imports: [FormWarningComponent, FormInputComponent],
  exports: [FormWarningComponent, FormInputComponent],
})
export class SharedComponentsModule {}
